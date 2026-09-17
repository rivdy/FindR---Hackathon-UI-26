# PhormulAI Backend

Repository directory: `racikai-backend`. Product: **PhormulAI**.

FastAPI and Jupyter project for cosmetic and personal care R&D.
Only `/health` is currently defined as an API route. Local Python modules support
ingredient lookup, source annotations, and HLB arithmetic. Formula prediction,
CAPA search, RCA, and optimization services remain placeholders.

See [the detailed PhormulAI specification](docs/PHORMULAI_SPECIFICATION.md) for
the data model, API roadmap, HLB rules, demo workflow, and implementation status.

## Local setup (PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Run commands from this directory. API docs: http://127.0.0.1:8000/docs.

## Data layout

- `data/raw/regulations/`: sourced CosIng, BPOM, and other regulatory references.
- `data/raw/coa/`: authorized CoA documents and manifests.
- `data/raw/formulations/`: formulation references and experimental records.
- `data/raw/capa/`: authorized, de-identified CAPA reports.
- `data/processed/`: reproducible processing outputs.
- `data/synthetic/`: clearly labeled synthetic data, separate from real experiments.
- `models/`: trained models and metadata.
- `tests/`: ingredient and HLB business-rule tests.
- `data/reference/`: versioned copies of the supplied HLB tables and project brief.

Data and model contents are ignored by Git by default. Explicitly supplied
dummy/HLB inputs have been archived for local use.
Other ingestion sources remain in their original locations. Review provenance, licenses, and confidentiality
before adding data. Keep API keys and credentials out of Git.

## R&D limitations

Formula candidates are not production-ready. Typical usage ranges are not
regulatory maximums, and missing restrictions do not imply unrestricted use.
Candidates require laboratory, stability, microbiological, safety, and regulatory
review. Report model performance only from actual experimental evaluation.
