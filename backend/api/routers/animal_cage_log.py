from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.animal_cage_log as schema
import api.cruds.animal_cage_log as animal_cage_log


@router.get("/api/animalCageLog", response_model=List[schema.AnimalCageLog])
async def get_animal_cage_log(
    date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await animal_cage_log.get_animal_cage_log(requested_date, db)


@router.post("/api/animalCageLog", response_model=schema.AnimalCageLogCreateResponse)
async def create_animal_cage_log(
    meal: schema.AnimalCageLogCreate, db: AsyncSession = Depends(get_db)
):
    return await animal_cage_log.create_animal_cage_log(db, meal)


@router.put(
    "/api/animalCageLog/{id}", response_model=schema.AnimalCageLogCreateResponse
)
async def update_animal_cage_log(
    id: int,
    new_enrichment: schema.AnimalCageLogCreate,
    db: AsyncSession = Depends(get_db),
):
    elm = await animal_cage_log.get_animal_cage_log_by_id(id, db)
    if elm is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await animal_cage_log.update_animal_cage_log(db, new_enrichment, elm)


@router.delete("/api/animalCageLog/{id}")
async def delete_animal_cage_log(id: int, db: AsyncSession = Depends(get_db)):
    return await animal_cage_log.delete_animal_cage_log(id, db)
