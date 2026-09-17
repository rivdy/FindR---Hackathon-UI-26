"""Versioned local RCA corpus and supplementary English halal reference."""
import argparse
from collections import Counter
import csv
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import shutil

from app.rca_data import parse_fishbone

RCA_HEADERS = ['CAPA_No', 'Date', 'Description_of_non_conformance', 'Source_of_non_conformance',
               'Risk_level', 'Correction_Immediate_Action', 'Investigation_Fishbone_RCA', 'Proposed_CAPA',
               'Corrective_Action_Implemented', 'Preventive_Action_Implemented',
               'CAPA_Effectiveness_Evaluation', 'CAPA_Timeframe_RnD', 'Status']


def read_csv(path, expected):
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != expected:
            raise ValueError(f"Unexpected schema: {path.name}")
        rows = list(reader)
    if not rows or any(None in row or any(value is None for value in row.values()) for row in rows):
        raise ValueError(f"Empty or malformed CSV: {path.name}")
    return rows


def ingest(rca: Path, halal: Path, root: Path, version="capa_v1"):
    if not re.fullmatch(r"[A-Za-z0-9_-]+", version):
        raise ValueError("Invalid version name")
    output = root / "data/processed" / version
    rca_raw = root / "data/raw/capa" / version
    halal_raw = root / "data/raw/regulations/halal" / f"{version}_english"
    if any(path.exists() for path in (output, rca_raw, halal_raw)):
        raise FileExistsError("Output version exists; choose a new version")
    rows = read_csv(rca, RCA_HEADERS)
    english = read_csv(halal, ["Category", "Ingredients"])
    ids = [row["CAPA_No"].strip() for row in rows]
    if not all(ids) or len(ids) != len(set(ids)):
        raise ValueError("CAPA IDs must be present and unique")
    records = []
    for line, row in enumerate(rows, 2):
        day, month, year = row["Date"].split("-")
        month_number = ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec').index(month) + 1
        date_iso = datetime(int(year), month_number, int(day)).date().isoformat()
        parsed = parse_fishbone(row["Investigation_Fishbone_RCA"])
        warnings = ["source_claims_not_verified", "effectiveness_text_is_not_a_binary_outcome",
                    "no_batch_or_lab_evidence_links", "no_implementation_or_evaluation_dates"]
        if row["Status"].casefold() != "closed" and row["CAPA_Effectiveness_Evaluation"].strip():
            warnings.append("nonclosed_case_has_effectiveness_text_review_plan_vs_actual_result")
        if parsed["missing_categories"]:
            warnings.append("missing_fishbone_categories")
        records.append({"report_id": row["CAPA_No"].strip(), "date": date_iso,
                        "problem": row["Description_of_non_conformance"], "risk_level": row["Risk_level"],
                        "status": row["Status"], "source_type": row["Source_of_non_conformance"],
                        "correction": row["Correction_Immediate_Action"], "fishbone": parsed,
                        "proposed_capa": row["Proposed_CAPA"],
                        "corrective_action": row["Corrective_Action_Implemented"],
                        "preventive_action": row["Preventive_Action_Implemented"],
                        "effectiveness_text": row["CAPA_Effectiveness_Evaluation"],
                        "effectiveness_verified": False, "effectiveness_label": None,
                        "timeframe": row["CAPA_Timeframe_RnD"], "data_status": "USER_PROVIDED_UNVERIFIED",
                        "source_file": rca.name, "source_row": line, "warnings": warnings})
    digest = hashlib.sha256(halal.read_bytes()).hexdigest()
    unique, english_records = {}, []
    for line, row in enumerate(english, 2):
        key = (row["Category"].strip(), row["Ingredients"].strip())
        if not all(key):
            raise ValueError("English halal category and ingredient cannot be empty")
        if key in unique:
            unique[key]["source_rows"].append(line)
            continue
        record = {"reference_id": f"HALAL-EN-{digest[:12]}-{line:04d}", "category": key[0],
                  "name_id": key[1], "international_name_or_note": key[1], "source_rows": [line],
                  "source_file": halal.name, "source_sha256": digest,
                  "halal_status_code": "EXEMPTION_REFERENCE_ONLY", "official_certificate_number": "",
                  "source_verification": "SUPPLEMENTARY_ENGLISH_SOURCE_NOT_RECONCILED"}
        unique[key] = record
        english_records.append(record)
    pattern_counts = Counter(row["Investigation_Fishbone_RCA"] for row in rows)
    manifest = {"version": version, "created_at": datetime.now(timezone.utc).isoformat(),
                "rca_rows": len(rows), "unique_rca_patterns": len(pattern_counts),
                "statuses": dict(Counter(row["Status"] for row in rows)),
                "missing_category_counts": dict(Counter(cat for r in records for cat in r["fishbone"]["missing_categories"])),
                "nonclosed_with_effectiveness_text": sum('nonclosed_case_has_effectiveness_text_review_plan_vs_actual_result' in r['warnings'] for r in records),
                "halal_english_rows": len(english), "halal_unique_category_name_pairs": len(english_records),
                "halal_duplicate_rows_collapsed": len(english) - len(english_records),
                "halal_categories": dict(Counter(row["Category"] for row in english)),
                "halal_limitations": ["Supplementary only; does not replace Indonesian source", "No automatic halal approval", "Missing fermentation category"],
                "sources": [{"file": path.name, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()} for path in (rca, halal)]}
    for path in (output, rca_raw, halal_raw, output / "halal_english"):
        path.mkdir(parents=True)
    shutil.copyfile(rca, rca_raw / rca.name)
    shutil.copyfile(halal, halal_raw / halal.name)
    (output / "rca_records.json").write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    with (output / "halal_english/halal_exemptions.csv").open("x", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(english_records[0]))
        writer.writeheader()
        writer.writerows({**row, "source_rows": ";".join(map(str, row["source_rows"]))} for row in english_records)
    return manifest


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--rca", type=Path, required=True)
    parser.add_argument("--halal", type=Path, required=True)
    parser.add_argument("--version", default="capa_v1")
    args = parser.parse_args()
    print(json.dumps(ingest(args.rca, args.halal, Path(__file__).resolve().parents[1], args.version), indent=2))
