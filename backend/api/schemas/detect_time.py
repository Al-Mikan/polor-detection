from datetime import time
from typing import Optional

from pydantic import BaseModel


class DetectionTimeBase(BaseModel):
    startTime: time
    endTime: time

class DetectionTime(DetectionTimeBase):
    id: int

    class Config:
        orm_mode = True