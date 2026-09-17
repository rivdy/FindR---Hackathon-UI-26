"""Deterministic, case-specific Ishikawa diagrams from source RCA records."""
from copy import deepcopy
from html import escape
import json
from pathlib import Path
import textwrap

DEFAULT_CORPUS = Path(__file__).resolve().parents[1] / "data/processed/capa_v1/rca_records.json"
BRANCHES = (("Man", "Manusia"), ("Machine", "Mesin"), ("Material", "Material"),
            ("Method", "Metode"), ("Environment", "Lingkungan"), ("Measurement", "Pengukuran"))


class FishboneRepository:
    def __init__(self, path: Path = DEFAULT_CORPUS):
        records = json.loads(Path(path).read_text(encoding="utf-8"))
        self.records = {record["report_id"]: record for record in records}
        if len(records) != len(self.records):
            raise ValueError("Duplicate report IDs")

    def list_cases(self) -> list[dict]:
        return [{key: record[key] for key in ("report_id", "problem", "risk_level", "status", "date")}
                for record in self.records.values()]

    def get(self, report_id: str) -> dict:
        if report_id not in self.records:
            raise KeyError(f"Unknown RCA report: {report_id}")
        return deepcopy(self.records[report_id])

    def diagram(self, report_id: str) -> str:
        return render_fishbone(self.get(report_id))


def wrapped(value: str, width: int) -> list[str]:
    return textwrap.wrap(value, width=width, break_long_words=True, break_on_hyphens=False) or [""]


def render_fishbone(record: dict) -> str:
    """SVG includes full branch text; canvas expands instead of truncating it."""
    values = record["fishbone"]["branches"]
    content = []
    for key, title in BRANCHES:
        statements = [item for item in values.get(key, []) if item.strip()]
        lines = []
        for statement in statements:
            lines.extend(wrapped(statement, 43))
        if not lines:
            lines = ["Belum tercatat dalam CSV.", "Bukti pengukuran perlu dilengkapi." if key == "Measurement" else "Perlu investigasi tambahan."]
        content.append((key, title, lines, bool(statements)))
    box_height = max(250, 100 + 29 * max(len(item[2]) for item in content))
    top = 150
    spine = top + box_height + 160
    lower_top = spine + 145
    root_top = lower_top + box_height + 65
    roots = record["fishbone"].get("source_root_causes", [])
    root_lines = [line for root in roots for line in wrapped(root, 143)] or ["Belum tercatat dalam CSV."]
    root_height = 100 + 30 * len(root_lines)
    height = root_top + root_height + 80
    svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="{height}" viewBox="0 0 2200 {height}" role="img" aria-labelledby="diagramTitle diagramDescription">',
           f'<title id="diagramTitle">{escape(record["report_id"])} — Fishbone RCA</title>',
           '<desc id="diagramDescription">Pembagian enam kategori penyebab dari satu record. Pernyataan sumber belum diverifikasi; cabang kosong bukan penyebab terkonfirmasi.</desc>',
           '<rect width="100%" height="100%" fill="#f8fafc"/>',
           '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#12394d"/></marker></defs>']

    def text(x, y, lines, size=23, color="#263f4a", weight=400, step=29):
        svg.append(f'<text x="{x}" y="{y}" font-family="Segoe UI, Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}">')
        for index, line in enumerate(lines):
            svg.append(f'<tspan x="{x}" dy="{0 if index == 0 else step}">{escape(line)}</tspan>')
        svg.append('</text>')

    text(65, 62, ["PhormulAI / Fishbone RCA"], 37, weight=700)
    text(65, 104, [record["report_id"] + "  |  Pernyataan dari data sumber; perlu verifikasi"], 23)
    svg.append(f'<path d="M 85 {spine} H 1750" stroke="#12394d" stroke-width="7" marker-end="url(#arrow)"/>')
    for index, (key, title, lines, present) in enumerate(content):
        x = 65 + (index % 3) * 550
        y = top if index < 3 else lower_top
        color = '#16736e' if present else '#a86c16'
        fill = '#ffffff' if present else '#fff8e8'
        dash = '' if present else ' stroke-dasharray="10 7"'
        origin_y = y + box_height if index < 3 else y
        svg.append(f'<path d="M {x+250} {origin_y} L {x+395} {spine}" fill="none" stroke="{color}" stroke-width="4"{dash}/>')
        svg.append(f'<rect x="{x}" y="{y}" width="500" height="{box_height}" rx="14" fill="{fill}" stroke="{color}" stroke-width="2"{dash}/>')
        text(x+22, y+42, [title.upper() + " / " + key], 25, color, 700)
        text(x+22, y+84, lines)
    problem_lines = wrapped(record["problem"], 27)
    problem_height = 100 + 28 * len(problem_lines)
    problem_y = spine - problem_height / 2
    svg.append(f'<rect x="1790" y="{problem_y}" width="360" height="{problem_height}" rx="16" fill="#12394d"/>')
    text(1810, problem_y+43, ["MASALAH / EFFECT"], 23, '#9fe3d5', 700)
    text(1810, problem_y+83, problem_lines, 23, '#ffffff', step=28)
    svg.append(f'<rect x="65" y="{root_top}" width="2085" height="{root_height}" rx="16" fill="#e6f0f2"/>')
    text(90, root_top+40, ['ROOT CAUSE YANG DINYATAKAN DALAM CSV'], 24, '#12394d', 700)
    text(90, root_top+80, root_lines, step=30)
    text(65, height-31, [f'Sumber: {record["source_file"]} | baris {record["source_row"]} | satu kasus, bukan kesimpulan seluruh dataset'], 20)
    svg.append('</svg>')
    return '\n'.join(svg)
