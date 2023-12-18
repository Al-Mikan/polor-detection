from datetime import date, time

from pydantic import BaseModel


# 収用
class ExpropriationBase(BaseModel):
    expropriation: int


class ExpropriationCreate(ExpropriationBase):
    date: date
    polarId: int


class ExpropriationCreateResponse(ExpropriationCreate):
    id: int

    class Config:
        from_attributes = True


class Expropriation(ExpropriationBase):
    id: int

    class Config:
        from_attributes = True
