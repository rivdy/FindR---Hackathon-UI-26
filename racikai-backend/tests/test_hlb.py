import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from app.hlb import blend_two, oil_phase_required_hlb, parse_hlb_range
from scripts.import_hlb import parse_tables


class HlbTests(unittest.TestCase):
    def test_notes_example_mass_and_hlb_balance(self):
        result = blend_two(15, 4.3, 12, 10)
        self.assertAlmostEqual(result["mass_a_g"], 7.19626168224)
        self.assertAlmostEqual(result["mass_a_g"] + result["mass_b_g"], 10)
        self.assertAlmostEqual(result["calculated_hlb"], 12)
        self.assertEqual(blend_two(15, 4.3, 15, 10)["mass_b_g"], 0)
        self.assertAlmostEqual(blend_two(4.3, 15, 12, 10)["mass_b_g"], result["mass_a_g"])

    def test_impossible_equal_and_invalid_inputs(self):
        for values in ((15, 4.3, 18, 10), (5, 5, 6, 10), (15, 4.3, 12, 0), (float('nan'), 4, 5, 10), (15, 4, 12, -1)):
            with self.subTest(values=values), self.assertRaises(ValueError):
                blend_two(*values)
        self.assertEqual(blend_two(5, 5, 5, 10)["status"], "underdetermined")

    def test_ranges_are_not_midpoints(self):
        self.assertEqual(parse_hlb_range("10-12"), (10, 12))
        self.assertEqual(parse_hlb_range("--"), (None, None))
        self.assertEqual(parse_hlb_range("40"), (40, 40))
        with self.assertRaises(ValueError):
            parse_hlb_range("12-10")

    def test_oil_example_and_missing_phase_values(self):
        oils = [{"mass_g": mass, "emulsion_type": "O/W", "required_hlb_min": value, "required_hlb_max": value}
                for mass, value in ((15, 9), (10, 12), (20, 10), (5, 15))]
        self.assertAlmostEqual(oil_phase_required_hlb(oils, "O/W")["required_hlb_min"], 10.6)
        with self.assertRaises(ValueError):
            oil_phase_required_hlb(oils, "W/O")
        oils[0]["required_hlb_min"] = None
        with self.assertRaises(ValueError):
            oil_phase_required_hlb(oils, "O/W")

    def test_malformed_multitable_input_fails(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / "invalid.csv"
            path.write_text("Table 15-5 Example\nSubstance,HLB\nA,4,unexpected\n", encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "Column count"):
                parse_tables(path)
