from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.meal as schema
import api.cruds.meal as meal_crud


@router.get("/api/meals/{polarId}", response_model=List[schema.Meal])
async def get_meals(
    polarId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await meal_crud.get_meals(requested_date, polarId, db)


@router.post("/api/meals", response_model=schema.MealCreateResponse)
async def create_meal(meal: schema.MealCreate, db: AsyncSession = Depends(get_db)):
    return await meal_crud.create_meal(db, meal)


@router.put("/api/meals/{id}", response_model=schema.MealCreateResponse)
async def update_meal(
    id: int, new_meal: schema.MealBase, db: AsyncSession = Depends(get_db)
):
    enrichment = await meal_crud.get_meal_by_id(id, db)
    if enrichment is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await meal_crud.update_meal(db, new_meal, enrichment)


@router.delete("/api/meals/{id}")
async def delete_meal(id: int, db: AsyncSession = Depends(get_db)):
    return await meal_crud.delete_meal(id, db)
