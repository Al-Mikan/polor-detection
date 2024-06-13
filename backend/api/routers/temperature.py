from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.temperature as schema
import api.cruds.temperature as temperature_crud


@router.get("/api/temperatures/{animalId}", response_model=List[schema.Temperature])
async def get_temperatures(
    animalId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await temperature_crud.get_temperatures(requested_date, animalId, db)


@router.post("/api/temperatures", response_model=schema.TemperatureCreateResponse)
async def create_temperature(
    temp: schema.TemperatureCreate, db: AsyncSession = Depends(get_db)
):
    return await temperature_crud.create_temperature(db, temp)


@router.put("/api/temperatures/{id}", response_model=schema.TemperatureCreateResponse)
async def update_temperature(
    id: int, new_temp: schema.TemperatureBase, db: AsyncSession = Depends(get_db)
):
    temperature = await temperature_crud.get_temperature_by_id(id, db)
    if temperature is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await temperature_crud.update_temperature(db, new_temp, temperature)


@router.delete("/api/temperatures/{id}")
async def delete_temperature(id: int, db: AsyncSession = Depends(get_db)):
    return await temperature_crud.delete_temperature(id, db)
