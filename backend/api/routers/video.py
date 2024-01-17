from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, UploadFile, Form
from sqlalchemy.ext.asyncio import AsyncSession
from api.detect.yolo_script import run_yolov8_on_video

router = APIRouter()

from api.db import get_db
import api.schemas.video as schema
import api.cruds.video as crud


@router.get("/api/video", response_model=List[schema.Video])
async def get_video(
    date: str = Query(...),
    db: AsyncSession = Depends(get_db),
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await crud.get_video(requested_date, db)


@router.post("/api/video", response_model=None)
async def create_video(
    date: str = Form(...),
    cageId: int = Form(...),
    videoStartTime: int = Form(...),
    video: UploadFile = Form(...),
    db: AsyncSession = Depends(get_db),
):
    new_video = await crud.create_video(db, date, cageId, videoStartTime, video)
    # await run_yolov8_on_video(new_video.videoPath)
    return None


# @router.put("/api/video/{id}", response_model=None)
# async def update_video(
#     id: int, new_temp: schema.TrainingBase, db: AsyncSession = Depends(get_db)
# ):
#     training = await crud.get_training_by_id(id, db)
#     if training is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return await crud.update_video(db, new_temp, training)


# @router.delete("/api/video/{id}")
# async def delete_video(id: int, db: AsyncSession = Depends(get_db)):
#     return await crud.delete_video(id, db)
