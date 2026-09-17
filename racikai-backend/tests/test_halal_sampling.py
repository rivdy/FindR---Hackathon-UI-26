import csv
from datetime import date
from pathlib import Path
from random import Random
from tempfile import TemporaryDirectory
import unittest

from app.formula_sampling import sample_ingredient_concentration, sample_halal_ingredient_concentration
from app.halal import HalalCatalog
from scripts.import_halal import HEADERS, ingest


class HalalSamplingTests(unittest.TestCase):
    def setUp(self):
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        root = Path(self.temp.name)
        self.root = root
        self.source = root / "source.csv"
        with self.source.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.writer(handle)
            writer.writerow(HEADERS)
            writer.writerow(["F. Test fixture", "1", "Nama Uji", "Test Ingredient"])
            writer.writerow(["G. Test fixture", "1", "Bahan Uji Lain", "Other Ingredient"])
        self.manifest = ingest(self.source, root)
        self.catalog = HalalCatalog(root / "data/processed/halal_v1")
        self.today = date(2026, 9, 17)
        self.row = {"inci_name": "Test Ingredient", "supplier_sku": "TEST-SKU", "typical_pct_min": 1, "typical_pct_max": 5}
        self.limits = {"test_role": {"minimum_pct": 2, "maximum_pct": 4}}
        self.review = {
            "review_id": "TEST-ONLY", "ingredient": "Test Ingredient", "supplier_sku": "TEST-SKU",
            "reviewer": "Unit test fixture", "evidence_reference": "Synthetic test evidence",
            "reviewed_on": "2026-09-01", "valid_until": "2026-09-30", "decision": "EXEMPTION_REVIEWED",
            "supplier_and_process_scope_verified": True, "official_source_checked": True,
            "exemption_conditions_verified": True,
            "exemption_reference_id": self.catalog.rows[0]["reference_id"],
        }

    def test_import_keeps_original_and_refuses_overwrite(self):
        self.assertEqual(self.manifest["rows"], 2)
        self.assertEqual(self.manifest["duplicate_category_number_keys"], 0)
        self.assertEqual(self.source.read_bytes(), (self.root / "data/raw/regulations/halal/halal_v1/source.csv").read_bytes())
        with self.assertRaises(FileExistsError):
            ingest(self.source, self.root)

    def test_match_is_not_certification_and_substrings_do_not_match(self):
        match = self.catalog.lookup(" test   ingredient ")
        self.assertEqual(match["halal_status_code"], "EXEMPTION_CANDIDATE_REQUIRES_REVIEW")
        self.assertFalse(match["eligible_for_halal_required_sampling"])
        self.assertEqual(self.catalog.lookup("Test Ingredient extract")["matches"], [])
        with self.assertRaisesRegex(ValueError, "Halal review required"):
            sample_halal_ingredient_concentration(self.row, "test_role", Random(42), role_limits=self.limits, halal_catalog=self.catalog)

    def test_review_requires_scope_dates_and_conditions(self):
        for changes in ({"supplier_sku": "OTHER"}, {"ingredient": "OTHER"}, {"valid_until": "2026-09-16"},
                        {"reviewed_on": "2026-09-18"}, {"reviewer": ""}, {"exemption_conditions_verified": False},
                        {"official_source_checked": False}, {"supplier_and_process_scope_verified": False},
                        {"exemption_reference_id": "INVALID"}, {"decision": "NOT_ACCEPTED"}):
            with self.subTest(changes=changes):
                result = self.catalog.evaluate("Test Ingredient", "TEST-SKU", {**self.review, **changes}, on_date=self.today)
                self.assertFalse(result["eligible_for_halal_required_sampling"])

    def test_reviewed_exemption_allows_only_candidate_sampling(self):
        result = sample_halal_ingredient_concentration(self.row, "test_role", Random(42), role_limits=self.limits,
                                                      halal_catalog=self.catalog, halal_review=self.review, on_date=self.today)
        self.assertTrue(2 <= result["percentage"] <= 4)
        self.assertEqual(result["halal_assessment"]["product_halal_status"], "NOT_EVALUATED")
        self.assertFalse(result["halal_assessment"]["certification_issued_by_application"])

    def test_certificate_route_needs_number_and_scope_not_exemption_match(self):
        review = {**self.review, "ingredient": "Unknown Ingredient", "decision": "CERTIFICATE_REVIEWED"}
        self.assertFalse(self.catalog.evaluate("Unknown Ingredient", "TEST-SKU", review, on_date=self.today)["eligible_for_halal_required_sampling"])
        review.update(certificate_number="TEST-NOT-A-CERTIFICATE", certificate_scope_verified=True)
        self.assertTrue(self.catalog.evaluate("Unknown Ingredient", "TEST-SKU", review, on_date=self.today)["eligible_for_halal_required_sampling"])

    def test_sampling_intersection_and_reproducibility(self):
        first = sample_ingredient_concentration(self.row, "test_role", Random(4), role_limits=self.limits)
        second = sample_ingredient_concentration(self.row, "test_role", Random(4), role_limits=self.limits)
        self.assertEqual(first, second)
        self.assertTrue(2 <= first <= 4)

    def test_sampling_rejects_bad_ranges_and_unknown_roles(self):
        for low, high in ((6, 8), (5, 1), (float("nan"), 5), (-1, 5), (1, None)):
            with self.subTest(low=low, high=high), self.assertRaises(ValueError):
                sample_ingredient_concentration({**self.row, "typical_pct_min": low, "typical_pct_max": high},
                                                "test_role", Random(1), role_limits=self.limits)
        with self.assertRaisesRegex(ValueError, "Unknown formula role"):
            sample_ingredient_concentration(self.row, "missing", Random(1), role_limits=self.limits)

    def test_rounding_stays_in_interval_and_narrow_interval_fails(self):
        limits = {"test_role": {"minimum_pct": 0, "maximum_pct": 100}}
        row = {**self.row, "typical_pct_min": "1.23456", "typical_pct_max": "1.23464"}
        self.assertEqual(sample_ingredient_concentration(row, "test_role", Random(42), role_limits=limits), 1.2346)
        with self.assertRaisesRegex(ValueError, "four decimal places"):
            sample_ingredient_concentration({**row, "typical_pct_max": "1.23457"}, "test_role", Random(1), role_limits=limits)
