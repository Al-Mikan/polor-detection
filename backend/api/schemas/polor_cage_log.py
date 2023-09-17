from datetime import date
from typing import Optional

from pydantic import BaseModel


class PolorCageLogBase(BaseModel):
    polorId: int
    cageId: int

class PolorCageLogCreate(PolorCageLogBase):
    date: date

class PolorCageLogCreateResponse(PolorCageLogCreate):
    id: int

    class Config:
        orm_mode = True

class PolorCageLog(PolorCageLogBase):
    id: int

    class Config:
        orm_mode = True
