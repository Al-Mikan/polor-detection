from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

from api.db import get_db
import api.schemas.expropriation as schema
import api.cruds.expropriation as crud


@router.get("/api/expropriation/{polorId}", response_model=List[schema.Expropriation])
async def get_expropriation(polorId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await crud.get_expropriation(requested_date,polorId,db)

@router.post("/api/expropriation", response_model=schema.ExpropriationCreateResponse)
async def create_expropriation(meal: schema.ExpropriationCreate,db: AsyncSession = Depends(get_db)):
    return await crud.create_expropriation(db,meal)

@router.put("/api/expropriation/{id}", response_model=schema.ExpropriationCreateResponse)
async def update_expropriation(id: int, new_event: schema.ExpropriationBase ,db: AsyncSession = Depends(get_db)):
    el = await crud.get_expropriation_by_id(id,db)
    if el is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await crud.update_expropriation(db,new_event,el)

@router.delete("/api/expropriation/{id}")
async def delete_expropriation(id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_expropriation(id,db)
