"""Concentration proposal constrained by configured role ranges and halal review.

Sampling is not model prediction or regulatory/formula validation. Role bounds
must be configured per product; no universal numeric defaults are invented.
"""
from datetime import date
from decimal import Decimal, InvalidOperation, ROUND_CEILING, ROUND_FLOOR
import math

from .halal import HalalCatalog


def _percentage(value, label: str) -> Decimal:
    if isinstance(value, bool):
        raise ValueError(f"{label} must be a numeric percentage")
    try:
        result = Decimal(str(value))
    except InvalidOperation as exc:
        raise ValueError(f"{label} must be a numeric percentage") from exc
    if not result.is_finite() or not 0 <= result <= 100:
        raise ValueError(f"{label} must be finite and between 0 and 100")
    return result


def sample_ingredient_concentration(ingredient_row, formula_role, random_generator, *, role_limits):
    """Intersect typical usage with product-specific role limits and sample.

    Rounding to four decimal places must not leave the allowed interval.
    role_limits is explicit rather than an undefined FORMULA_ROLE_LIMITS global.
    """
    if formula_role not in role_limits:
        raise ValueError(f"Unknown formula role: {formula_role}")
    limits = role_limits[formula_role]
    try:
        typical_low = _percentage(ingredient_row["typical_pct_min"], "typical_pct_min")
        typical_high = _percentage(ingredient_row["typical_pct_max"], "typical_pct_max")
        role_low = _percentage(limits["minimum_pct"], "minimum_pct")
        role_high = _percentage(limits["maximum_pct"], "maximum_pct")
    except KeyError as exc:
        raise ValueError(f"Missing concentration configuration: {exc.args[0]}") from exc
    if typical_low > typical_high or role_low > role_high:
        raise ValueError("Minimum concentration cannot exceed maximum")
    lower, upper = max(typical_low, role_low), min(typical_high, role_high)
    if lower > upper:
        raise ValueError(f"Rentang konsentrasi tidak valid untuk {ingredient_row.get('inci_name', 'unknown')} pada role {formula_role}: {lower}–{upper}")
    quantum = Decimal("0.0001")
    safe_lower = lower.quantize(quantum, rounding=ROUND_CEILING)
    safe_upper = upper.quantize(quantum, rounding=ROUND_FLOOR)
    if safe_lower > safe_upper:
        raise ValueError("Range has no representable percentage at four decimal places")
    sampled = float(random_generator.uniform(float(lower), float(upper)))
    if not math.isfinite(sampled) or not float(lower) <= sampled <= float(upper):
        raise ValueError("Random generator returned a value outside the requested range")
    rounded = Decimal(str(sampled)).quantize(quantum)
    return float(min(safe_upper, max(safe_lower, rounded)))


def sample_halal_ingredient_concentration(ingredient_row, formula_role, random_generator,
                                         *, role_limits, halal_catalog: HalalCatalog,
                                         halal_review: dict | None = None, on_date: date | None = None):
    """Mandatory halal evidence gate for proposals with a halal requirement."""
    name = str(ingredient_row.get("inci_name", "")).strip()
    sku = str(ingredient_row.get("supplier_sku", "")).strip()
    assessment = halal_catalog.evaluate(name, sku, halal_review, on_date=on_date)
    if not assessment["eligible_for_halal_required_sampling"]:
        raise ValueError(f"Halal review required for {name}: {assessment['halal_status_code']}")
    return {
        "inci_name": name, "supplier_sku": sku, "formula_role": formula_role,
        "percentage": sample_ingredient_concentration(ingredient_row, formula_role, random_generator, role_limits=role_limits),
        "halal_assessment": assessment, "proposal_method": "random_range_sampling",
        "regulatory_status": "NOT_EVALUATED", "formula_status": "CANDIDATE_REQUIRES_VALIDATION",
    }
