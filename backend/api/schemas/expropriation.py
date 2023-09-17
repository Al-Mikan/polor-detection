from datetime import date, time

from pydantic import BaseModel


class ExpropriationBase(BaseModel):
    poolCleaning: bool


class ExpropriationCreate(ExpropriationBase):
    date: date
    polorId: int


class ExpropriationResponse(ExpropriationCreate):
    id: int

    class Config:
        orm_mode = True


class Expropriation(ExpropriationBase):
    id: int

    class Config:
        orm_mode = True
