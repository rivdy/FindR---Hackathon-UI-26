"""Initial API data contracts; candidates require laboratory validation."""
from pydantic import BaseModel, Field

class IngredientAmount(BaseModel):
    inci_name: str = Field(min_length=1)
    percentage: float = Field(ge=0, le=100)

class FormulaCandidate(BaseModel):
    ingredients: list[IngredientAmount]
    validation_status: str = "requires_lab_and_regulatory_review"
