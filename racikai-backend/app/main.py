"""FastAPI entry point for PhormulAI."""
from fastapi import FastAPI

app = FastAPI(title="PhormulAI", version="0.1.0")

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "product": "PhormulAI"}
