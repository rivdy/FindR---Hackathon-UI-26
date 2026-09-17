"""HLB-only supervised baseline using independently reviewed multilabel targets.

Never use function text or emulgator_yes_no as predictors: they expose targets.
The small dummy dataset cannot establish real-world generalization.
"""
from .ingredient_intelligence import LABELS, number


def train_reviewed_baseline(rows: list[dict]) -> dict:
    import numpy as np
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.impute import SimpleImputer
    from sklearn.metrics import classification_report
    from sklearn.model_selection import GroupShuffleSplit
    from sklearn.multioutput import MultiOutputClassifier
    from sklearn.pipeline import make_pipeline

    if len(rows) < 20:
        raise ValueError("At least 20 independently reviewed rows are required for this prototype")
    features, targets, groups = [], [], []
    for row in rows:
        if row.get("label_status") != "expert_reviewed" or not row.get("review_source", "").strip():
            raise ValueError("All rows need expert_reviewed status and review_source")
        name = row.get("Ingredient", "").strip().casefold()
        if not name:
            raise ValueError("An ingredient identity is required for grouped evaluation")
        target = []
        for label in LABELS:
            raw = str(row.get(f"reviewed_{label}", ""))
            if raw not in {"0", "1"}:
                raise ValueError("Reviewed labels must be 0 or 1")
            target.append(int(raw))
        values = [number(row.get(key)) for key in ("HLB", "rHLB")]
        features.append([np.nan if value is None else value for value in values])
        targets.append(target)
        groups.append(name)
    x, y = np.asarray(features), np.asarray(targets)
    train, test = next(GroupShuffleSplit(n_splits=1, test_size=0.3, random_state=42).split(x, y, groups))
    if not np.isfinite(x[train]).any():
        raise ValueError("Training requires verified numeric HLB/rHLB measurements; all training features are missing")
    for index, label in enumerate(LABELS):
        if len(np.unique(y[train, index])) < 2 or len(np.unique(y[test, index])) < 2:
            raise ValueError(f"Both classes must occur in train and test for {label}; collect more reviewed data")
    surfactant_only = (y[:, 1] == 1) & (y[:, 2] == 0)
    if not surfactant_only[train].any() or not surfactant_only[test].any():
        raise ValueError("Need reviewed non-emulsifying surfactants in both train and test")
    model = make_pipeline(
        SimpleImputer(strategy="median", add_indicator=True, keep_empty_features=True),
        MultiOutputClassifier(RandomForestClassifier(n_estimators=100, max_depth=3, class_weight="balanced", random_state=42)),
    )
    model.fit(x[train], y[train])
    prediction = model.predict(x[test])
    return {
        "model": model,
        "features": ["HLB", "rHLB"],
        "reports": {label: classification_report(y[test, i], prediction[:, i], output_dict=True, zero_division=0) for i, label in enumerate(LABELS)},
        "train_rows": len(train),
        "test_rows": len(test),
        "limitation": "Prototype on reviewed data only; HLB and missingness may encode dummy-generation rules. External ingredient and laboratory validation required.",
    }
