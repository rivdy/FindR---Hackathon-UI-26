"""Arithmetic screening only; values and system suitability require human review."""
import math
import re


def nonnegative(value: float, name: str) -> float:
    if isinstance(value, bool):
        raise ValueError(f"{name} must be numeric")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be numeric") from exc
    if not math.isfinite(result) or result < 0:
        raise ValueError(f"{name} must be finite and nonnegative")
    return result


def parse_hlb_range(raw: str) -> tuple[float | None, float | None]:
    """Preserve reported ranges; no default midpoint or universal upper bound."""
    text = raw.strip()
    if text.lower() in {"", "--", "n/a", "na"}:
        return None, None
    match = re.fullmatch(r"(\d+(?:\.\d+)?)(?:\s*[-–]\s*(\d+(?:\.\d+)?))?", text)
    if not match:
        raise ValueError(f"Invalid HLB range: {raw}")
    low = nonnegative(match[1], "lower HLB")
    high = nonnegative(match[2] or match[1], "upper HLB")
    if low > high:
        raise ValueError("HLB range is reversed")
    return low, high


def blend_two(hlb_a: float, hlb_b: float, target: float, total_emulsifier_g: float) -> dict:
    """Solve a two-component blend at a caller-specified total dosage.

    Equal HLBs matching target admit infinitely many ratios, returned as
    underdetermined; the calculator never arbitrarily picks a ratio.
    """
    a, b, target, total = [nonnegative(v, n) for v, n in
                           ((hlb_a, "HLB A"), (hlb_b, "HLB B"), (target, "target"), (total_emulsifier_g, "mass"))]
    if total <= 0:
        raise ValueError("Total emulsifier mass must be positive")
    if not min(a, b) <= target <= max(a, b):
        raise ValueError("Target lies outside the achievable blend interval")
    if a == b:
        return {"status": "underdetermined", "target_hlb": target,
                "fraction_a": None, "fraction_b": None, "mass_a_g": None, "mass_b_g": None,
                "total_emulsifier_g": total, "reason": "Equal HLBs: any ratio reaches this target"}
    fraction_a = (target - b) / (a - b)
    fraction_b = 1 - fraction_a
    return {
        "status": "arithmetic_screening_only", "target_hlb": target,
        "fraction_a": fraction_a, "fraction_b": fraction_b,
        "mass_a_g": fraction_a * total, "mass_b_g": fraction_b * total,
        "total_emulsifier_g": total,
        "calculated_hlb": fraction_a * a + fraction_b * b,
        "stability_status": "not_evaluated", "regulatory_status": "not_evaluated",
    }


def oil_phase_required_hlb(components: list[dict], emulsion_type: str) -> dict:
    """Weighted interval over all explicitly selected oil-phase constituents.

    Each component: mass_g, emulsion_type, required_hlb_min/max. Do not supply
    formula water, emulsifiers, or generic HLB values as oil required HLB.
    This function validates shape and numbers, not chemical phase membership.
    """
    if emulsion_type not in {"O/W", "W/O"} or not components:
        raise ValueError("Select O/W or W/O and provide the complete oil phase")
    checked = []
    for component in components:
        if component.get("emulsion_type") != emulsion_type:
            raise ValueError("Cannot mix required HLB values from different emulsion types")
        mass = nonnegative(component.get("mass_g"), "oil mass")
        low = nonnegative(component.get("required_hlb_min"), "required HLB minimum")
        high = nonnegative(component.get("required_hlb_max"), "required HLB maximum")
        if low > high:
            raise ValueError("Required HLB range is reversed")
        checked.append((mass, low, high))
    total = math.fsum(mass for mass, _, _ in checked)
    if total <= 0:
        raise ValueError("Oil phase mass must be positive")
    low = math.fsum((mass / total) * value for mass, value, _ in checked)
    high = math.fsum((mass / total) * value for mass, _, value in checked)
    return {"emulsion_type": emulsion_type, "oil_mass_g": total,
            "required_hlb_min": low, "required_hlb_max": high,
            "status": "arithmetic_screening_only", "stability_status": "not_evaluated"}
