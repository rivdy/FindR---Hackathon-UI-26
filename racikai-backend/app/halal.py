"""Halal evidence screening, not certification or automatic legal determinations.

Reviews must come from a trusted human-review workflow, never arbitrary frontend
claims. This module cannot authenticate documents or the reviewer. Exemption
matching alone never approves material use.
"""
import csv
from datetime import date
from pathlib import Path

from .ingredient_catalog import normalize_inci

DEFAULT_DIRECTORY = Path(__file__).resolve().parents[1] / "data/processed/halal_v1"


class HalalCatalog:
    def __init__(self, directory: Path = DEFAULT_DIRECTORY):
        with (Path(directory) / "halal_exemptions.csv").open(encoding="utf-8-sig", newline="") as handle:
            self.rows = list(csv.DictReader(handle))
        self.by_id = {row["reference_id"]: row for row in self.rows}
        self.by_name = {}
        for row in self.rows:
            for field in ("name_id", "international_name_or_note"):
                key = normalize_inci(row[field])
                if key and row["reference_id"] not in self.by_name.setdefault(key, {}):
                    self.by_name[key][row["reference_id"]] = row

    def lookup(self, name: str) -> dict:
        if not name.strip():
            raise ValueError("Ingredient name is required")
        matches = list(self.by_name.get(normalize_inci(name), {}).values())
        return {
            "ingredient": name,
            "halal_status_code": "EXEMPTION_CANDIDATE_REQUIRES_REVIEW" if matches else "UNKNOWN_REQUIRES_REVIEW",
            "match_method": "exact_normalized_name_or_whole_note" if matches else "unmatched",
            "matches": [dict(row) for row in matches],
            "eligible_for_halal_required_sampling": False,
            "requires_human_review": True,
        }

    def evaluate(self, ingredient: str, supplier_sku: str, review: dict | None = None,
                 *, on_date: date | None = None) -> dict:
        """Apply a documented, scoped human decision supplied by trusted code.

        valid_until is the internal next-review deadline (not a universal legal
        certificate expiry rule). Supplier/process changes require a new review.
        """
        result = {**self.lookup(ingredient), "supplier_sku": supplier_sku}
        if review is None:
            return result

        def block(reason: str) -> dict:
            return {**result, "halal_status_code": "REVIEW_INCOMPLETE_OR_INAPPLICABLE",
                    "reason": reason, "eligible_for_halal_required_sampling": False}

        required = ("review_id", "ingredient", "supplier_sku", "reviewer", "evidence_reference", "reviewed_on", "valid_until", "decision")
        if any(not isinstance(review.get(field), str) or not review[field].strip() for field in required):
            return block("Review identity, scope, evidence and review dates are required")
        if not supplier_sku.strip() or normalize_inci(review["ingredient"]) != normalize_inci(ingredient) or review["supplier_sku"] != supplier_sku:
            return block("Review does not match this ingredient and supplier SKU")
        try:
            reviewed_on = date.fromisoformat(review["reviewed_on"])
            valid_until = date.fromisoformat(review["valid_until"])
        except ValueError:
            return block("Review dates must use YYYY-MM-DD")
        today = on_date or date.today()
        if not reviewed_on <= today <= valid_until:
            return block("Review is future-dated or past its review deadline")
        if review["decision"] == "NOT_ACCEPTED":
            return {**result, "halal_status_code": "NOT_ACCEPTED_BY_REVIEW", "review_id": review["review_id"]}
        if review.get("supplier_and_process_scope_verified") is not True:
            return block("Supplier, grade and process scope must be reviewed")
        if review["decision"] == "CERTIFICATE_REVIEWED":
            if not isinstance(review.get("certificate_number"), str) or not review["certificate_number"].strip() or review.get("certificate_scope_verified") is not True:
                return block("Certificate number and scope verification are required")
        elif review["decision"] == "EXEMPTION_REVIEWED":
            reference = self.by_id.get(review.get("exemption_reference_id"))
            if reference is None or review.get("official_source_checked") is not True or review.get("exemption_conditions_verified") is not True:
                return block("Reference ID, official-source check and exemption conditions are required")
            # A human may establish an INCI alias; the original source name remains visible.
            result["reviewed_exemption_reference"] = dict(reference)
        else:
            return block("Unknown review decision")
        return {**result, "halal_status_code": review["decision"], "review_id": review["review_id"],
                "evidence_reference": review["evidence_reference"], "eligible_for_halal_required_sampling": True,
                "requires_human_review": False, "certification_issued_by_application": False,
                "assessment_basis": "supplied_human_review", "product_halal_status": "NOT_EVALUATED"}
