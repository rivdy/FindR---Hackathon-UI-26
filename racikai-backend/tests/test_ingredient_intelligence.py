import unittest
from app.ingredient_intelligence import audit_ingredient, number, weighted_hlb
from app.ingredient_learning import train_reviewed_baseline


class IngredientTests(unittest.TestCase):
    def test_required_hlb_is_not_an_emollient_label(self):
        result = audit_ingredient({"function": "UV filter", "rHLB": "7"})
        self.assertEqual(result["provisional_emollient"], 0)

    def test_multifunction_and_missing_hlb(self):
        result = audit_ingredient({"function": "Emollient; surfactant; emulsifying"})
        self.assertEqual([result[f"provisional_{key}"] for key in ("emollient", "surfactant", "emulsifier")], [1, 1, 1])
        self.assertIsNone(number("N/A"))

    def test_blend_and_incomplete_data(self):
        self.assertEqual(weighted_hlb([{"mass_g": 3, "HLB": 4}, {"mass_g": 1, "HLB": 12}], "HLB"), 6)
        with self.assertRaises(ValueError):
            weighted_hlb([{"mass_g": 1, "rHLB": "N/A"}], "rHLB")

    def test_training_rejects_unreviewed_labels(self):
        with self.assertRaisesRegex(ValueError, "expert_reviewed"):
            train_reviewed_baseline([{"Ingredient": "dummy"}] * 20)


if __name__ == "__main__":
    unittest.main()
