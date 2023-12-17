from datetime import date
from typing import Optional

from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile


# class VideoBase(BaseModel):
#     UploadFile: UploadFile


class VideoCreate(BaseModel):
    date: date
    polorId: int


class VideoCreateResponse(VideoCreate):
    id: int

    class Config:
        orm_mode = True


class Video(BaseModel):
    id: int

    class Config:
        orm_mode = True
