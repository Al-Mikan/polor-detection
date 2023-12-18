from datetime import date, time

from pydantic import BaseModel


class PoolCleaningBase(BaseModel):
    poolCleaning: bool


class PoolCleaningCreate(PoolCleaningBase):
    date: date
    polarId: int


class PoolCleaningCreateResponse(PoolCleaningCreate):
    id: int

    class Config:
        from_attributes = True


class PoolCleaning(PoolCleaningBase):
    id: int

    class Config:
        from_attributes = True
