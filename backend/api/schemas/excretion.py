from datetime import date
from typing import Optional

from pydantic import BaseModel


# 排泄
class ExcretionBase(BaseModel):
    number: int
    status: str


class ExcretionCreate(ExcretionBase):
    date: date
    animalId: int


class ExcretionCreateResponse(ExcretionCreate):
    id: int

    class Config:
        from_attributes = True


class Excretion(ExcretionBase):
    id: int

    class Config:
        from_attributes = True
