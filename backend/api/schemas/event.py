from datetime import date, time

from pydantic import BaseModel


class EventBase(BaseModel):
    event: str


class EventCreate(EventBase):
    animalId: int
    date: date


class EventCreateResponse(EventCreate):
    id: int

    class Config:
        from_attributes = True


class Event(EventBase):
    id: int

    class Config:
        from_attributes = True
