"""Local NLP retrieval with source attribution; similarity is not effectiveness."""
from copy import deepcopy
from datetime import date
import json
from pathlib import Path

DEFAULT_CORPUS = Path(__file__).resolve().parents[1] / "data/processed/capa_v1/rca_records.json"


class CapaSearch:
    def __init__(self, path: Path = DEFAULT_CORPUS):
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.pipeline import FeatureUnion
        self.records = json.loads(Path(path).read_text(encoding="utf-8"))
        if not self.records:
            raise ValueError("CAPA corpus is empty")
        # Problem-only retrieval avoids ranking by duplicated root-cause/outcome templates.
        self.vectorizer = FeatureUnion([
            ("word", TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True)),
            ("character", TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 5), sublinear_tf=True)),
        ], transformer_weights={"word": 0.7, "character": 0.3})
        self.matrix = self.vectorizer.fit_transform([record["problem"] for record in self.records])

    def search(self, query: str, limit: int = 5, *, as_of: date | None = None) -> list[dict]:
        from sklearn.metrics.pairwise import cosine_similarity
        if not query.strip() or not isinstance(limit, int) or isinstance(limit, bool) or not 1 <= limit <= 100:
            raise ValueError("Provide a nonempty query and integer limit 1–100")
        scores = cosine_similarity(self.vectorizer.transform([query]), self.matrix)[0]
        ranked = sorted(range(len(scores)), key=lambda index: (-scores[index], self.records[index]["report_id"]))
        result = []
        for index in ranked:
            record = self.records[index]
            if scores[index] <= 0 or (as_of and date.fromisoformat(record["date"]) > as_of):
                continue
            result.append({**deepcopy(record), "similarity_score": float(scores[index]),
                           "retrieval_method": "TFIDF_WORD_CHARACTER_COSINE",
                           "score_meaning": "text_similarity_not_probability_of_effectiveness"})
            if len(result) == limit:
                break
        return result


def search_capa(query: str, limit: int = 5) -> list[dict]:
    return CapaSearch().search(query, limit)
