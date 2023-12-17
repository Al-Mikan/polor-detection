from datetime import date
from typing import Optional

from pydantic import BaseModel


class WaterBase(BaseModel):
    value: float


class WaterCreate(WaterBase):
    date: date
    polarId: int


class WaterCreateResponse(WaterCreate):
    id: int

    class Config:
        orm_mode = True


class Water(WaterBase):
    id: int

    class Config:
        orm_mode = True
