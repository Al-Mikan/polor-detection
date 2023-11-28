from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.video as schema
import api.cruds.video as crud


@router.get("/api/video/{polorId}", response_model=List[schema.Training])
async def get_video(
    polorId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await crud.get_video(requested_date, polorId, db)


@router.post("/api/video", response_model=None)
async def create_video(temp: schema.TrainingCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_training(db, temp)


@router.put("/api/video/{id}", response_model=None)
async def update_video(
    id: int, new_temp: schema.TrainingBase, db: AsyncSession = Depends(get_db)
):
    training = await crud.get_training_by_id(id, db)
    if training is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await crud.update_training(db, new_temp, training)


@router.delete("/api/video/{id}")
async def delete_video(id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_training(id, db)
