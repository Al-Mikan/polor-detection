from datetime import date
from typing import Optional

from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File


class VideoBase(BaseModel):
    UploadFile: UploadFile = File()


class VideoCreate(BaseModel):
    date: date
    polorId: int


class VideoCreateResponse(VideoCreate):
    id: int

    class Config:
        orm_mode = True


class Video(VideoBase):
    id: int

    class Config:
        orm_mode = True
