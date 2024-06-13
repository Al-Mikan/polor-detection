from datetime import date, time
from typing import Optional

from pydantic import BaseModel


class MemoBase(BaseModel):
    memo: str


class MemoCreate(MemoBase):
    date: date
    animalId: int


class MemoCreateResponse(MemoCreate):
    id: int

    class Config:
        from_attributes = True


class Memo(MemoBase):
    id: int

    class Config:
        from_attributes = True
