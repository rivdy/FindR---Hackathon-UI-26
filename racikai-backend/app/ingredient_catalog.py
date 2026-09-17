"""Query the locally ingested source annotations without regulatory approval claims."""
import csv
import re
from pathlib import Path

DEFAULT_DIRECTORY = Path(__file__).resolve().parents[1] / "data" / "processed" / "ingredient_sources_v2"


def normalize_inci(value: str) -> str:
    # Preserve punctuation: similar ingredient names are not necessarily aliases.
    return re.sub(r"\s+", " ", value.strip()).upper()


def function_labels(text: str) -> dict[str, bool]:
    tokens = {normalize_inci(token) for token in text.split(";") if token.strip()}
    return {
        "emollient": bool(tokens & {"EMOLLIENT", "SKIN CONDITIONING - EMOLLIENT"}),
        "surfactant": any(re.match(r"^SURFACTANT(?:\s*-|$)", token) for token in tokens),
        "emulsifier": bool(tokens & {"EMULSIFYING", "EMULSIFIER", "SURFACTANT - EMULSIFYING"}),
    }


class IngredientCatalog:
    def __init__(self, directory: Path = DEFAULT_DIRECTORY):
        path = Path(directory) / "cosing_ingredient_master.csv"
        if not path.is_file():
            raise FileNotFoundError("Run scripts/ingest_ingredient_sources.ps1 first")
        with path.open(encoding="utf-8-sig", newline="") as source:
            self.ingredients = {row["inci_key"]: row for row in csv.DictReader(source)}

    def lookup(self, inci_name: str) -> dict:
        row = self.ingredients.get(normalize_inci(inci_name))
        if row is None:
            return {"Ingredient": inci_name, "match_status": "unmatched", "regulatory_status": "not_evaluated"}
        return dict(row)

    def search(self, query: str, limit: int = 20) -> list[dict]:
        if not 1 <= limit <= 100:
            raise ValueError("limit must be between 1 and 100")
        key = normalize_inci(query)
        results = []
        for name, row in self.ingredients.items():
            if key in name:
                results.append(dict(row))
                if len(results) == limit:
                    break
        return results
