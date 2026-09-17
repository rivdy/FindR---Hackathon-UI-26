"""Import user-supplied multi-table HLB reference. Never execute the notes file."""
import argparse
import csv
import hashlib
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

from app.hlb import blend_two, oil_phase_required_hlb, parse_hlb_range

SECTIONS = {
    "Table 15-5": "amphiphile_hlb",
    "Table 15-6": "oil_required_hlb",
    "Example 15-8 Calculation": "example_ingredients",
    "Example 15-8 RHLB Calculation": "example_contributions",
}


def parse_tables(path: Path) -> dict:
    tables = {name: [] for name in SECTIONS.values()}
    section, headers = None, None
    with path.open(encoding="utf-8-sig", newline="") as handle:
        for line, cells in enumerate(csv.reader(handle), 1):
            if not cells or not any(cell.strip() for cell in cells):
                continue
            title = next((value for prefix, value in SECTIONS.items() if cells[0].startswith(prefix)), None)
            if title:
                section, headers = title, None
                continue
            if section is None:
                raise ValueError(f"Unexpected content on CSV line {line}")
            if headers is None:
                headers = cells
                continue
            if len(cells) != len(headers):
                raise ValueError(f"Column count mismatch on CSV line {line}")
            tables[section].append({**dict(zip(headers, cells)), "source_line": line})
    if any(not rows for rows in tables.values()):
        raise ValueError("All four expected HLB tables must be present")
    return tables


def write_csv(path: Path, rows: list[dict]):
    with path.open("x", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def ingest(source: Path, notes: Path, brief: Path, root: Path, version: str = "hlb_v1") -> dict:
    if not version or any(char not in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-" for char in version):
        raise ValueError("Version must be a simple directory name")
    raw_dir, output = root / "data/reference" / version, root / "data/processed" / version
    if raw_dir.exists() or output.exists():
        raise FileExistsError("Version exists; choose a new version to preserve prior outputs")
    for path in (source, notes, brief):
        if not path.is_file():
            raise FileNotFoundError(path)
    tables = parse_tables(source)
    records = []
    for section in ("amphiphile_hlb", "oil_required_hlb"):
        for row in tables[section]:
            name = row.get("Substance", row.get("Ingredient"))
            for column in (["HLB"] if section == "amphiphile_hlb" else ["O/W", "W/O"]):
                low, high = parse_hlb_range(row[column])
                warnings = ["bibliographic_source_and_grade_unverified", "not_a_cosmetic_allowlist"]
                if high is not None and high > 20:
                    warnings.append("outside_conventional_nonionic_scale_review_method")
                if name == "Caster oil":
                    warnings.append("possible_spelling_issue_preserve_original")
                records.append({"reference_id": f"{version}:{section}:{row['source_line']}:{column}",
                                "source_name": name, "value_kind": "HLB" if column == "HLB" else "required_HLB",
                                "emulsion_type": "" if column == "HLB" else column,
                                "value_raw": row[column], "value_min": low, "value_max": high,
                                "data_status": "REFERENCE_UNVERIFIED", "value_status": "missing" if low is None else "reported",
                                "identity_status": "needs_alias_and_grade_review", "source_file": source.name,
                                "source_section": section, "source_line": row["source_line"],
                                "regulatory_status": "not_evaluated", "warnings": ";".join(warnings)})
    example_oils = []
    for row in tables["example_ingredients"]:
        if row["RHLB (O/W)"]:
            low, high = parse_hlb_range(row["RHLB (O/W)"])
            example_oils.append({"mass_g": float(row["Amount"].removesuffix(" g")), "emulsion_type": "O/W",
                                 "required_hlb_min": low, "required_hlb_max": high})
    oil_result = oil_phase_required_hlb(example_oils, "O/W")
    example = {"data_status": "EDUCATIONAL_EXAMPLE", "oil_example": oil_result,
               "notes_example": blend_two(15.0, 4.3, 12.0, 10.0),
               "notes_interpretation": "Parameters manually transcribed; attached Python was not executed"}
    raw_dir.mkdir(parents=True)
    output.mkdir(parents=True)
    manifest = []
    for path in (source, notes, brief):
        destination = raw_dir / path.name
        shutil.copyfile(path, destination)
        manifest.append({"source_name": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                         "archived_path": str(destination.relative_to(root)), "bytes": path.stat().st_size})
    write_csv(output / "hlb_reference.csv", records)
    for section in ("example_ingredients", "example_contributions"):
        write_csv(output / f"{section}.csv", tables[section])
    report = {"version": version, "created_at": datetime.now(timezone.utc).isoformat(),
              "section_rows": {key: len(value) for key, value in tables.items()}, "normalized_records": len(records),
              "missing_values": sum(row["value_min"] is None for row in records),
              "sources": manifest, "examples": example,
              "limitations": ["No automatic ingredient alias matching", "No verified supplier values", "No model training"]}
    (output / "manifest.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--notes", type=Path, required=True)
    parser.add_argument("--brief", type=Path, required=True)
    parser.add_argument("--version", default="hlb_v1")
    args = parser.parse_args()
    result = ingest(args.source, args.notes, args.brief, Path(__file__).resolve().parents[1], args.version)
    print(json.dumps({key: result[key] for key in ("version", "section_rows", "normalized_records", "missing_values", "examples")}, indent=2))
