from datetime import date
from typing import Optional

from pydantic import BaseModel


class PolarCageLogBase(BaseModel):
    polarId: int
    cageId: int


class PolarCageLogCreate(PolarCageLogBase):
    date: date


class PolarCageLogCreateResponse(PolarCageLogCreate):
    id: int

    class Config:
        from_attributes = True


class PolarCageLog(PolarCageLogBase):
    id: int

    class Config:
        from_attributes = True
