from datetime import time
from typing import Optional

from pydantic import BaseModel


class DetectionTime(BaseModel):
    id: int
    polorId: Optional[int]
    startTime: time
    endTime: time
