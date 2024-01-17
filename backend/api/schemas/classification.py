from datetime import time

from pydantic import BaseModel


class ClassificationBase(BaseModel):
    startTime: time
    endTime: time
    cageId: int
    classification: int


class ClassificationCreate(ClassificationBase):
    date: str


class Classification(ClassificationBase):
    id: int

    class Config:
        from_attributes = True
