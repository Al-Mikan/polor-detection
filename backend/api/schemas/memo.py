from datetime import date,time
from typing import Optional

from pydantic import BaseModel


class MemoBase(BaseModel):
    polorId: int
    memo: str

class MemoCreate(MemoBase):
    date: date

class MemoCreateResponse(MemoCreate):
    id: int

    class Config:
        orm_mode = True

class MemoTime(MemoBase):
    id: int

    class Config:
        orm_mode = True
