from datetime import date
from typing import Optional

from pydantic import BaseModel


class TrainingBase(BaseModel):
    training: str

class TrainingCreate(TrainingBase):
    date: date
    polorId: int

class TrainingCreateResponse(TrainingCreate):
    id: int

    class Config:
        orm_mode = True

class Training(TrainingBase):
    id: int

    class Config:
        orm_mode = True
