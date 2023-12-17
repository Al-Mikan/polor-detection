from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, UploadFile, Form
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.video as schema
import api.cruds.video as crud


@router.get("/api/video/{polorId}", response_model=List[schema.Video])
async def get_video(
    polorId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await crud.get_video(requested_date, polorId, db)


@router.post("/api/video", response_model=None)
async def create_video(
    temp: schema.VideoCreate,
    date: str = Form(...),
    polorId: int = Form(...),
    video: UploadFile = Form(min_length=1),
    db: AsyncSession = Depends(get_db),
):
    return await crud.create_video(db, date, polorId, video)


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
