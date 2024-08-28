from datetime import time, date

from pydantic import BaseModel


class ClassificationBase(BaseModel):
    startTime: time
    endTime: time
    cageId: int
    classification: int


class ClassificationCreate(ClassificationBase):
    date: date


class ClassificationCreateResponse(ClassificationCreate):
    id: int

    class Config:
        from_attributes = True


class Classification(ClassificationBase):
    id: int

    class Config:
        from_attributes = True
