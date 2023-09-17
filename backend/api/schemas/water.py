from datetime import date
from typing import Optional

from pydantic import BaseModel


class WaterBase(BaseModel):
    polorId: int
    value: float

class WaterCreate(WaterBase):
    date: date

class WaterCreateResponse(WaterCreate):
    id: int

    class Config:
        orm_mode = True

class Water(WaterBase):
    id: int

    class Config:
        orm_mode = True
