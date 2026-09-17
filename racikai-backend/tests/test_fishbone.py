import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from xml.etree import ElementTree

from app.fishbone import FishboneRepository, render_fishbone
from app.rca_data import parse_fishbone
from scripts.build_fishbone_viewer import build


def case(report_id, problem, cause):
    return {'report_id': report_id, 'problem': problem, 'risk_level': 'High', 'status': 'Open',
            'date': '2026-09-01', 'source_file': 'test.csv', 'source_row': 2,
            'fishbone': parse_fishbone(cause)}


class FishboneTests(unittest.TestCase):
    def test_selected_case_controls_entire_diagram(self):
        with TemporaryDirectory() as directory:
            path = Path(directory) / 'records.json'
            path.write_text(json.dumps([case('A', 'Pemisahan fase', '[Material] Emulsifier A.'),
                                        case('B', 'Sedimentasi pigmen', '[Machine] Mesin grinding B.')]), encoding='utf-8')
            repository = FishboneRepository(path)
            first, second = repository.diagram('A'), repository.diagram('B')
            self.assertIn('Emulsifier A.', first)
            self.assertNotIn('Emulsifier A.', second)
            self.assertIn('Mesin grinding B.', second)
            self.assertIn('Sedimentasi pigmen', second)
            with self.assertRaises(KeyError):
                repository.diagram('unknown')

    def test_missing_measurement_and_unsafe_text_are_preserved_as_text(self):
        svg = render_fishbone(case('A', '<script>alert(1)</script>', '[Material] A & B. -> [Root Cause] <test>'))
        root = ElementTree.fromstring(svg)
        self.assertIn('PENGUKURAN', svg)
        self.assertIn('Belum tercatat dalam CSV.', svg)
        self.assertIn('&lt;script&gt;', svg)
        self.assertEqual(root.findall('.//{http://www.w3.org/2000/svg}script'), [])

    def test_full_text_is_retained_and_canvas_expands(self):
        long_case = case('B', 'Problem', '[Material] ' + 'Kalimat sumber panjang. ' * 100)
        svg = render_fishbone(long_case)
        root = ElementTree.fromstring(svg)
        self.assertGreater(int(root.attrib['height']), 2000)
        self.assertIn('Kalimat sumber panjang.', ''.join(root.itertext()))

    def test_portable_build_escapes_script_closers_and_refuses_overwrite(self):
        with TemporaryDirectory() as directory:
            path, output = Path(directory) / 'records.json', Path(directory) / 'viewer.html'
            record = case('A', '</script><script>alert(1)</script> __RCA_DIAGRAMS__', '[Man] A.')
            path.write_text(json.dumps([record]), encoding='utf-8')
            self.assertEqual(build(path, output)['cases'], 1)
            content = output.read_text(encoding='utf-8')
            self.assertNotIn('</script><script>alert(1)</script>', content)
            self.assertIn('\\u003c/script\\u003e', content)
            self.assertIn('<template data-report-id="A">', content)
            with self.assertRaises(FileExistsError):
                build(path, output)
