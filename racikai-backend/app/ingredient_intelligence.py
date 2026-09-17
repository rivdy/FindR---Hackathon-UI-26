"""Provisional multilabel ingredient audit, not a regulatory decision."""
import math
from .ingredient_catalog import function_labels

LABELS = ("emollient", "surfactant", "emulsifier")


def number(value):
    """Missing values remain missing; never replace N/A with zero."""
    if value is None or str(value).strip().lower() in {"", "n/a", "na", "nan", "none"}:
        return None
    result = float(value)
    if not math.isfinite(result) or result < 0:
        raise ValueError("Expected a finite nonnegative HLB value")
    return result


def audit_ingredient(row: dict) -> dict:
    labels = function_labels(str(row.get("function", "")))
    warnings = []
    hlb, required_hlb = number(row.get("HLB")), number(row.get("rHLB"))
    flag = str(row.get("emulgator_yes_no", "")).strip().lower()
    if flag in {"yes", "no"} and (flag == "yes") != labels["emulsifier"]:
        warnings.append("emulgator_flag_conflicts_with_function")
    if required_hlb is not None and not labels["emollient"]:
        warnings.append("required_hlb_does_not_establish_emollient_function")
    if labels["emollient"] and required_hlb is None:
        warnings.append("emollient_without_required_hlb")
    if hlb is not None and not (labels["surfactant"] or labels["emulsifier"]):
        warnings.append("hlb_without_surface_active_function_review_needed")
    if labels["emulsifier"] and not labels["surfactant"]:
        warnings.append("review_emulsifying_mechanism_before_assigning_surfactant")
    return {
        "Ingredient": row.get("Ingredient", ""),
        **{f"provisional_{key}": int(value) for key, value in labels.items()},
        "HLB": hlb,
        "rHLB": required_hlb,
        "label_status": "needs_expert_review",
        "source_type": "dummy",
        "warnings": ";".join(warnings),
        "reviewed_emollient": "",
        "reviewed_surfactant": "",
        "reviewed_emulsifier": "",
        "review_source": "",
    }


def weighted_hlb(components: list[dict], field: str) -> float:
    """Mass-weighted screening value for an explicitly selected compatible blend.

    Caller must select the oil phase for rHLB or emulsifier blend for HLB,
    verify supplier values, emulsion type, and applicability of the HLB system.
    This calculation does not establish stability or classify ingredient function.
    """
    if field not in {"HLB", "rHLB"} or not components:
        raise ValueError("Select HLB or rHLB and provide components")
    values = []
    for component in components:
        mass = number(component.get("mass_g"))
        value = number(component.get(field))
        if mass is None or value is None:
            raise ValueError("Every selected component needs mass and a verified HLB value")
        values.append((mass, value))
    total = sum(mass for mass, _ in values)
    if total <= 0:
        raise ValueError("Total mass must be positive")
    return sum(mass * value for mass, value in values) / total
