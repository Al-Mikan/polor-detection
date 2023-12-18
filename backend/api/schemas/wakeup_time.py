from datetime import date, time
from typing import Optional

from pydantic import BaseModel


class WakeUpTimeBase(BaseModel):
    time: time


class WakeUpTimeCreate(WakeUpTimeBase):
    date: date
    polarId: int


class WakeUpTimeCreateResponse(WakeUpTimeCreate):
    id: int

    class Config:
        from_attributes = True


class WakeUpTime(WakeUpTimeBase):
    id: int

    class Config:
        from_attributes = True
