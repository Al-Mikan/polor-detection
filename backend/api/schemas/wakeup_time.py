from datetime import date,time
from typing import Optional

from pydantic import BaseModel


class WakeUpTimeBase(BaseModel):
    polorId: int
    time: time

class WakeUpTimeCreate(WakeUpTimeBase):
    date: date

class WakeUpTimeCreateResponse(WakeUpTimeCreate):
    id: int

    class Config:
        orm_mode = True

class WakeUpTime(WakeUpTimeBase):
    id: int

    class Config:
        orm_mode = True
