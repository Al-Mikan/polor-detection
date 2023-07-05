from datetime import  date
from pydantic import BaseModel

class EnrichmentBase(BaseModel):
    enrichment: str

class EnrichmentCreate(EnrichmentBase):
    polorId: int
    date: date

class EnrichmentCreateResponse(EnrichmentCreate):
    id: int
    class Config:
        orm_mode = True

class Enrichment(BaseModel):
    id: int
    class Config:
        orm_mode = True