from datetime import time

from pydantic import BaseModel


class DetectionTimeBase(BaseModel):
    startTime: time
    endTime: time
    cageId: int


class DetectionTime(DetectionTimeBase):
    id: int

    class Config:
        orm_mode = True
