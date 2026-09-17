"""Build a portable, offline case selector; no new web dependencies required."""
import argparse
from html import escape
import json
from pathlib import Path

from app.fishbone import DEFAULT_CORPUS, FishboneRepository


def build(corpus: Path, output: Path):
    if output.exists():
        raise FileExistsError("Output exists; select a new filename")
    repository = FishboneRepository(corpus)
    if not repository.records:
        raise ValueError("RCA corpus is empty")
    records = list(repository.records.values())
    template = Path(__file__).resolve().parents[1] / "app/templates/fishbone_viewer.html"
    source = template.read_text(encoding="utf-8")
    # JSON must not be able to close its script element; all SVG text is XML escaped.
    payload = json.dumps(records, ensure_ascii=False).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
    diagrams = '\n'.join(f'<template data-report-id="{escape(record["report_id"], quote=True)}">{repository.diagram(record["report_id"])}</template>' for record in records)
    # Split first, so marker-like untrusted data cannot trigger later replacements.
    parts = source.split('__RCA_DATA__')
    if len(parts) != 2 or parts[1].count('__RCA_DIAGRAMS__') != 1:
        raise ValueError("Invalid viewer template")
    before_diagrams, after_diagrams = parts[1].split('__RCA_DIAGRAMS__')
    html = parts[0] + payload + before_diagrams + diagrams + after_diagrams
    output.parent.mkdir(parents=True, exist_ok=True)
    with output.open('x', encoding='utf-8') as handle:
        handle.write(html)
    return {"cases": len(records), "output": str(output), "bytes": output.stat().st_size}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--corpus', type=Path, default=DEFAULT_CORPUS)
    parser.add_argument('--output', type=Path, default=DEFAULT_CORPUS.parent / 'rca_fishbone_explorer.html')
    args = parser.parse_args()
    print(json.dumps(build(args.corpus, args.output), indent=2))
