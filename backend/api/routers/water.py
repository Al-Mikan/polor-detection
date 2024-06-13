from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.water as schema
import api.cruds.water as cruds


@router.get("/api/water/{animalId}", response_model=List[schema.Water])
async def get_water(
    animalId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await cruds.get_water(requested_date, animalId, db)


@router.post("/api/water", response_model=schema.WaterCreateResponse)
async def create_water(meal: schema.WaterCreate, db: AsyncSession = Depends(get_db)):
    return await cruds.create_water(db, meal)


@router.put("/api/water/{id}", response_model=schema.WaterCreateResponse)
async def update_water(
    id: int, new_el: schema.WaterBase, db: AsyncSession = Depends(get_db)
):
    elm = await cruds.get_water_by_id(id, db)
    if elm is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await cruds.update_water(db, new_el, elm)


@router.delete("/api/water/{id}")
async def delete_water(id: int, db: AsyncSession = Depends(get_db)):
    return await cruds.delete_water(id, db)
