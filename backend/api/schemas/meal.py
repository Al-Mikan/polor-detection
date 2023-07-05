from datetime import  time,date
from pydantic import BaseModel

class MealBase(BaseModel):
    time: time
    meal: str

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
