from datetime import date, time

from pydantic import BaseModel


class EnrichmentBase(BaseModel):
    enrichment: str


class EnrichmentCreate(EnrichmentBase):
    polarId: int
    date: date


class EnrichmentCreateResponse(EnrichmentCreate):
    id: int

    class Config:
        from_attributes = True


class Enrichment(EnrichmentBase):
    id: int

    class Config:
        from_attributes = True
