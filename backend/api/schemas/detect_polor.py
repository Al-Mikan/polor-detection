from datetime import date
from typing import Optional

from pydantic import BaseModel


class DetectionPolorBase(BaseModel):
    polorId: Optional[int]

class DetectionPolorCreate(DetectionPolorBase):
    date: date

class DetectionPolorCreateResponse(DetectionPolorCreate):
    id: int

    class Config:
        orm_mode = True

class DetectionPolor(DetectionPolorBase):
    id: int

    class Config:
        orm_mode = True
