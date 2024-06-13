from datetime import date
from typing import Optional

from pydantic import BaseModel


class AnimalCageLogBase(BaseModel):
    animalId: int
    cageId: int


class AnimalCageLogCreate(AnimalCageLogBase):
    date: date


class AnimalCageLogCreateResponse(AnimalCageLogCreate):
    id: int

    class Config:
        from_attributes = True


class AnimalCageLog(AnimalCageLogBase):
    id: int

    class Config:
        from_attributes = True
