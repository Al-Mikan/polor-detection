from datetime import date, time
from typing import Optional

from pydantic import BaseModel


class MemoBase(BaseModel):
    memo: str


class MemoCreate(MemoBase):
    date: date
    polarId: int


class MemoCreateResponse(MemoCreate):
    id: int

    class Config:
        orm_mode = True


class Memo(MemoBase):
    id: int

    class Config:
        orm_mode = True
