from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

from api.db import get_db
import api.schemas.excretion as schema
import api.cruds.excretion as crud


@router.get("/api/excretion/{polorId}", response_model=List[schema.Excretion])
async def get_excretion(polorId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await crud.get_excretion(requested_date,polorId,db)

@router.post("/api/excretion", response_model=schema.ExcretionCreateResponse)
async def create_excretion(meal: schema.ExcretionCreate,db: AsyncSession = Depends(get_db)):
    return await crud.create_excretion(db,meal)

@router.put("/api/excretion/{id}", response_model=schema.ExcretionCreateResponse)
async def update_excretion(id: int, new_event: schema.ExcretionBase ,db: AsyncSession = Depends(get_db)):
    el = await crud.get_excretion_by_id(id,db)
    if el is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await crud.update_excretion(db,new_event,el)

@router.delete("/api/excretion/{id}")
async def delete_excretion(id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_excretion(id,db)
