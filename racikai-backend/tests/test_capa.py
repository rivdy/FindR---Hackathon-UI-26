import csv
from datetime import date
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from app.capa_search import CapaSearch
from app.rca_copilot import generate_rca
from app.rca_data import parse_fishbone
from scripts.import_rca_knowledge import ingest, RCA_HEADERS


class CapaTests(unittest.TestCase):
    def setUp(self):
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.rca = self.root / 'input.csv'
        self.halal = self.root / 'english.csv'
        with self.rca.open('w', encoding='utf-8', newline='') as handle:
            writer = csv.DictWriter(handle, fieldnames=RCA_HEADERS)
            writer.writeheader()
            for number, problem in enumerate(('Pemisahan fase minyak dan air', 'Pigmen mengalami perubahan warna'), 1):
                row = {key: '' for key in RCA_HEADERS}
                row.update(CAPA_No=f'TEST-{number}', Date=f'0{number}-Sep-2026',
                           Description_of_non_conformance=problem, Status='Open',
                           Investigation_Fishbone_RCA=f'[Material] Pernyataan bahan {number}. -> [Root Cause] Klaim sumber {number}.',
                           CAPA_Effectiveness_Evaluation='Narasi keberhasilan belum diverifikasi')
                writer.writerow(row)
        self.halal.write_text('Category,Ingredients\nTest,Test Material\nTest,Test Material\n', encoding='utf-8')
        self.manifest = ingest(self.rca, self.halal, self.root)
        self.path = self.root / 'data/processed/capa_v1/rca_records.json'

    def test_parser_preserves_unknowns_and_does_not_invent_measurement(self):
        result = parse_fishbone('[Man] A. [Machine] B. -> [Root Cause] C. [Other] D.')
        self.assertEqual(result['branches']['Machine'], ['B.'])
        self.assertEqual(result['source_root_causes'], ['C.'])
        self.assertIn('Measurement', result['missing_categories'])
        self.assertEqual(result['unrecognized_sections'][0]['text'], 'D.')

    def test_ingestion_flags_effectiveness_and_preserves_duplicate_provenance(self):
        records = json.loads(self.path.read_text(encoding='utf-8'))
        self.assertTrue(all(r['effectiveness_label'] is None and not r['effectiveness_verified'] for r in records))
        self.assertEqual(self.manifest['nonclosed_with_effectiveness_text'], 2)
        self.assertEqual(self.manifest['halal_duplicate_rows_collapsed'], 1)
        with (self.path.parent / 'halal_english/halal_exemptions.csv').open(encoding='utf-8', newline='') as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(rows[0]['source_rows'], '2;3')
        with self.assertRaises(FileExistsError):
            ingest(self.rca, self.halal, self.root)

    def test_retrieval_relevance_oov_and_date_filter(self):
        engine = CapaSearch(self.path)
        results = engine.search('Pemisahan fase minyak dan air')
        self.assertEqual(results[0]['report_id'], 'TEST-1')
        self.assertGreater(results[0]['similarity_score'], 0.99)
        self.assertEqual(engine.search('zzzzzzqqqqq'), [])
        self.assertEqual(engine.search('Pemisahan fase', as_of=date(2026, 8, 31)), [])
        with self.assertRaises(ValueError):
            engine.search('')

    def test_outcome_text_is_not_a_search_feature(self):
        before = CapaSearch(self.path).search('Pemisahan fase minyak dan air')
        records = json.loads(self.path.read_text(encoding='utf-8'))
        records[1]['effectiveness_text'] = 'Pemisahan fase minyak dan air ' * 100
        self.path.write_text(json.dumps(records), encoding='utf-8')
        after = CapaSearch(self.path).search('Pemisahan fase minyak dan air')
        self.assertEqual([(r['report_id'], r['similarity_score']) for r in before],
                         [(r['report_id'], r['similarity_score']) for r in after])

    def test_rca_remains_a_draft_with_source_ids(self):
        result = generate_rca('Pemisahan fase minyak dan air', [], search_engine=CapaSearch(self.path))
        self.assertFalse(result['llm_used'])
        self.assertIsNone(result['confirmed_root_cause'])
        self.assertIsNone(result['effectiveness_probability'])
        self.assertEqual(result['hypotheses'][0]['source_report_ids'], ['TEST-1'])
        self.assertEqual(len(result['five_whys']), 5)
        self.assertTrue(all(why['answer'] is None for why in result['five_whys']))
