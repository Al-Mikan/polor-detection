from datetime import date, time

from pydantic import BaseModel


class MealBase(BaseModel):
    time: time
    meal: str
    weight: float


class MealCreate(MealBase):
    date: date
    polorId: int


class MealCreateResponse(MealCreate):
    id: int

    class Config:
        orm_mode = True


class Meal(MealBase):
    id: int

    class Config:
        orm_mode = True
