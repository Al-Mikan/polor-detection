from datetime import date
from typing import Optional

from pydantic import BaseModel


class ExcretionBase(BaseModel):
    polorId: int
    number: int
    status: str

class ExcretionCreate(ExcretionBase):
    date: date

class ExcretionCreateResponse(ExcretionCreate):
    id: int

    class Config:
        orm_mode = True

class Excretion(ExcretionBase):
    id: int

    class Config:
        orm_mode = True
