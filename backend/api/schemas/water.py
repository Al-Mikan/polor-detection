from datetime import date
from typing import Optional

from pydantic import BaseModel


class WaterBase(BaseModel):
    value: float


class WaterCreate(WaterBase):
    date: date
    animalId: int


class WaterCreateResponse(WaterCreate):
    id: int

    class Config:
        from_attributes = True


class Water(WaterBase):
    id: int

    class Config:
        from_attributes = True
