from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.training as schema
import api.cruds.training as crud


@router.get("/api/training/{animalId}", response_model=List[schema.Training])
async def get_training(
    animalId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await crud.get_training(requested_date, animalId, db)


@router.post("/api/training", response_model=schema.TrainingCreateResponse)
async def create_training(
    temp: schema.TrainingCreate, db: AsyncSession = Depends(get_db)
):
    return await crud.create_training(db, temp)


@router.put("/api/training/{id}", response_model=schema.TrainingCreateResponse)
async def update_training(
    id: int, new_temp: schema.TrainingBase, db: AsyncSession = Depends(get_db)
):
    training = await crud.get_training_by_id(id, db)
    if training is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await crud.update_training(db, new_temp, training)


@router.delete("/api/training/{id}")
async def delete_training(id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_training(id, db)
