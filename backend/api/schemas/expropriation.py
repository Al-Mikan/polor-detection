from datetime import date, time

from pydantic import BaseModel

# 収用
class ExpropriationBase(BaseModel):
    expropriation: int


class ExpropriationCreate(ExpropriationBase):
    date: date
    polorId: int


class ExpropriationCreateResponse(ExpropriationCreate):
    id: int

    class Config:
        orm_mode = True


class Expropriation(ExpropriationBase):
    id: int

    class Config:
        orm_mode = True
