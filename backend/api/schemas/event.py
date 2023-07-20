from datetime import date,time

from pydantic import BaseModel


class EventBase(BaseModel):
    startTime: time
    endTime: time
    event: str


class EventCreate(EventBase):
    polorId: int
    date: date


class EventCreateResponse(EventCreate):
    id: int

    class Config:
        orm_mode = True


class Event(EventBase):
    id: int

    class Config:
        orm_mode = True
