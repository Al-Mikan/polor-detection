from typing import Optional
from datetime import  time
from pydantic import BaseModel


class DetectionTime(BaseModel):
    id: int
    startTime: time
    endTime: time