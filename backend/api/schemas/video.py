from datetime import date
from typing import Optional

from pydantic import BaseModel


class VideoBase(BaseModel):
    videoPath: str
    videoStartTime: int
    cageId: int


class VideoCreate(BaseModel):
    date: date


class VideoCreateResponse(VideoCreate):
    id: int

    class Config:
        orm_mode = True


class Video(VideoBase):
    id: int

    class Config:
        orm_mode = True
