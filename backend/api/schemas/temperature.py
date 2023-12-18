from datetime import date, time

from pydantic import BaseModel


class TemperatureBase(BaseModel):
    time: time
    temperature: float


class TemperatureCreate(TemperatureBase):
    date: date
    polarId: int


class TemperatureCreateResponse(TemperatureCreate):
    id: int

    class Config:
        from_attributes = True


class Temperature(TemperatureBase):
    id: int

    class Config:
        from_attributes = True
