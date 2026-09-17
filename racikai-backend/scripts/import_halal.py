"""Archive and normalize supplied exemption data without granting halal approval."""
import argparse
from collections import Counter
import csv
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import shutil

HEADERS = ["Kategori", "No", "Nama Bahan (Indonesia)", "Nama Internasional / Keterangan"]
OFFICIAL_REFERENCE = "https://bpjph.halal.go.id/read/penting-diketahui-ini-bahan-yang-dikecualikan-dari-kewajiban-bersertifikat-halal"


def ingest(source: Path, root: Path, version: str = "halal_v1") -> dict:
    if not re.fullmatch(r"[A-Za-z0-9_-]+", version):
        raise ValueError("Version must be a simple directory name")
    raw_dir = root / "data/raw/regulations/halal" / version
    output = root / "data/processed" / version
    if raw_dir.exists() or output.exists():
        raise FileExistsError("Version exists; choose a new version instead of overwriting")
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    with source.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != HEADERS:
            raise ValueError("Unexpected CSV schema")
        rows = list(reader)
    records = []
    for ordinal, row in enumerate(rows, 1):
        if None in row or any(row.get(key) is None for key in HEADERS):
            raise ValueError(f"Malformed column count at data row {ordinal}")
        if not all(row[key].strip() for key in HEADERS[:3]):
            raise ValueError(f"Missing category/number/name at data row {ordinal}")
        records.append({
            "reference_id": f"HALAL-REF-{digest[:12]}-{ordinal:04d}",
            "category": row["Kategori"], "source_number": row["No"],
            "name_id": row["Nama Bahan (Indonesia)"],
            "international_name_or_note": row["Nama Internasional / Keterangan"],
            "source_file": source.name, "source_data_row": ordinal,
            "source_sha256": digest, "source_verification": "USER_CSV_NOT_RECONCILED_TO_OFFICIAL_ANNEX",
            "halal_status_code": "EXEMPTION_REFERENCE_ONLY",
            "official_certificate_number": "",
        })
    if not records:
        raise ValueError("Empty halal reference")
    raw_dir.mkdir(parents=True)
    output.mkdir(parents=True)
    shutil.copyfile(source, raw_dir / source.name)
    with (output / "halal_exemptions.csv").open("x", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(records[0]))
        writer.writeheader()
        writer.writerows(records)
    key_counts = Counter((row["Kategori"], row["No"]) for row in rows)
    row_counts = Counter(tuple(row[key] for key in HEADERS) for row in rows)
    report = {
        "version": version, "created_at": datetime.now(timezone.utc).isoformat(),
        "source_file": source.name, "source_sha256": digest, "rows": len(rows),
        "columns": HEADERS, "categories": dict(Counter(row["Kategori"] for row in rows)),
        "duplicate_rows": sum(count - 1 for count in row_counts.values()),
        "duplicate_category_number_keys": sum(count - 1 for count in key_counts.values()),
        "missing_values": {key: sum(not row[key].strip() for row in rows) for key in HEADERS},
        "official_context_url": OFFICIAL_REFERENCE,
        "official_annex_reconciliation": "NOT_PERFORMED",
        "limitation": "Internal reference IDs and status codes are not official halal certification codes",
    }
    (output / "manifest.json").write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--version", default="halal_v1")
    args = parser.parse_args()
    print(json.dumps(ingest(args.source, Path(__file__).resolve().parents[1], args.version), indent=2, ensure_ascii=False))
