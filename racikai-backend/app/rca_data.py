"""Parse source assertions without treating them as confirmed causal evidence."""
import re

CATEGORIES = ("Man", "Machine", "Material", "Method", "Environment", "Measurement")
HEADINGS = {category.casefold(): category for category in (*CATEGORIES, "Root Cause")}


def parse_fishbone(text: str) -> dict:
    markers = list(re.finditer(r"\[([^\]]+)\]", text))
    branches = {category: [] for category in CATEGORIES}
    root_causes, unrecognized = [], []
    for index, marker in enumerate(markers):
        end = markers[index + 1].start() if index + 1 < len(markers) else len(text)
        value = text[marker.end():end].strip()
        value = re.sub(r"\s*->\s*$", "", value).strip()
        category = HEADINGS.get(marker[1].strip().casefold())
        if category == "Root Cause":
            root_causes.append(value)
        elif category in branches:
            branches[category].append(value)
        else:
            unrecognized.append({"label": marker[1], "text": value})
    if not markers and text.strip():
        unrecognized.append({"label": "unstructured", "text": text})
    return {"branches": branches, "source_root_causes": root_causes,
            "missing_categories": [key for key, values in branches.items() if not any(values)],
            "unrecognized_sections": unrecognized, "source_text": text,
            "evidence_status": "SOURCE_ASSERTION_UNVERIFIED"}
