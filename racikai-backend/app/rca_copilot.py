"""Retrieval-assisted investigation draft. No LLM or confirmed causal inference."""
from .capa_search import CapaSearch, DEFAULT_CORPUS
from .halal import HalalCatalog


def generate_rca(issue: str, evidence: list[str], *, search_engine=None,
                 ingredient_names: list[str] | None = None) -> dict:
    if not issue.strip() or not isinstance(evidence, list) or any(not isinstance(item, str) or not item.strip() for item in evidence):
        raise ValueError("Provide an issue and a list of nonempty evidence strings (or an empty list)")
    engine = search_engine if search_engine is not None else CapaSearch()
    matches = engine.search(issue, 5)
    grouped = {}
    for match in matches:
        for claim in match["fishbone"]["source_root_causes"]:
            grouped.setdefault(claim, []).append(match["report_id"])
    halal_context = []
    if ingredient_names:
        # Supplementary English list never replaces the primary reviewed workflow.
        supplementary = HalalCatalog(DEFAULT_CORPUS.parent / "halal_english")
        primary = HalalCatalog()
        halal_context = [{"ingredient": name, "primary_reference": primary.lookup(name),
                          "english_reference": supplementary.lookup(name),
                          "eligible_for_halal_required_sampling": False} for name in ingredient_names]
    return {
        "issue": issue, "method": "LOCAL_RETRIEVAL_AND_QUESTION_TEMPLATE", "llm_used": False,
        "evidence": [{"text": item, "status": "USER_SUPPLIED_UNVERIFIED"} for item in evidence],
        "similar_cases": matches,
        "hypotheses": [{"text": claim, "source_report_ids": ids, "status": "HISTORICAL_SOURCE_ASSERTION_NOT_CURRENT_ROOT_CAUSE"} for claim, ids in grouped.items()],
        "five_whys": [{"step": index, "question": question, "answer": None, "status": "AWAITING_HUMAN_EVIDENCE"}
                      for index, question in enumerate([
                          "Bukti apa yang menunjukkan masalah dan kapan penyimpangan pertama terlihat?",
                          "Mekanisme apa yang mungkin menjelaskan penyimpangan ini, dan apa buktinya?",
                          "Perubahan bahan, mesin, metode, pengukuran, atau lingkungan apa yang mendahuluinya?",
                          "Mengapa kontrol yang ada tidak mendeteksi atau mencegah perubahan tersebut?",
                          "Perubahan sistem apa yang perlu diuji untuk mencegah kejadian berulang?"], 1)],
        "missing_evidence": ["Batch/formula version dan actual CPP", "Hasil ukur beserta metode, kalibrasi dan timepoint",
                             "Lot/supplier/CoA bahan", "Bukti implementasi dan follow-up CAPA"],
        "bias_checks": ["Cari bukti yang menyangkal hipotesis utama", "Jangan menyamakan kemiripan teks dengan penyebab yang sama",
                        "Jangan menyimpulkan efektivitas dari status Closed"],
        "halal_context": halal_context, "confirmed_root_cause": None,
        "effectiveness_probability": None, "human_verification_required": True,
    }
