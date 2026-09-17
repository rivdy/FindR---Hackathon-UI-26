import csv
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from app.ingredient_catalog import IngredientCatalog, function_labels, normalize_inci


class CatalogTests(unittest.TestCase):
    def test_non_surfactant_and_stabilizer_are_not_emulsifying_surfactants(self):
        labels = function_labels("DISPERSING NON-SURFACTANT; EMULSION STABILISING")
        self.assertFalse(labels["surfactant"])
        self.assertFalse(labels["emulsifier"])

    def test_cosing_multifunction(self):
        self.assertEqual(function_labels("SKIN CONDITIONING - EMOLLIENT; SURFACTANT - EMULSIFYING"),
                         {"emollient": True, "surfactant": True, "emulsifier": True})
        labels = function_labels("SURFACTANT - CLEANSING")
        self.assertTrue(labels["surfactant"])
        self.assertFalse(labels["emulsifier"])

    def test_lookup_preserves_punctuation_and_unknown_status(self):
        with TemporaryDirectory() as directory:
            with (Path(directory) / "cosing_ingredient_master.csv").open("w", encoding="utf-8", newline="") as handle:
                writer = csv.DictWriter(handle, fieldnames=["inci_key", "Ingredient", "regulatory_status"])
                writer.writeheader()
                writer.writerow({"inci_key": "A/B", "Ingredient": "A/B", "regulatory_status": "not_evaluated"})
            catalog = IngredientCatalog(Path(directory))
            self.assertEqual(catalog.lookup(" a/b ")["Ingredient"], "A/B")
            self.assertEqual(catalog.lookup("A B")["match_status"], "unmatched")
            self.assertEqual(catalog.lookup("unknown")["regulatory_status"], "not_evaluated")
        self.assertEqual(normalize_inci("  cetyl   alcohol "), "CETYL ALCOHOL")
