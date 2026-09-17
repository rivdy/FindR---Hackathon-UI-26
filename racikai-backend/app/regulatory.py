"""Ingredient restriction checks backed by verified regulatory sources.

Typical usage ranges are not regulatory maximums.
Missing restriction data does not establish permission to use an ingredient.
"""

def check_ingredient(inci_name: str) -> dict[str, str]:
    return {
        "inci_name": inci_name,
        "status": "not_evaluated",
        "reason": "Verified regulatory data has not been connected.",
    }
