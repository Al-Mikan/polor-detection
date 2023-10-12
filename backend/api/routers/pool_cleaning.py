from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

from api.db import get_db
import api.schemas.pool_cleaning as schema
import api.cruds.pool_cleaning as cruds


@router.get("/api/poolCleaning/{polorId}", response_model=List[schema.PoolCleaning])
async def get_pool_cleaning(polorId: int,date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await cruds.get_pool_cleaning(requested_date,polorId,db)

@router.post("/api/poolCleaning", response_model=schema.PoolCleaningCreateResponse)
async def create_pool_cleaning(meal: schema.PoolCleaningCreate,db: AsyncSession = Depends(get_db)):
    return await cruds.create_pool_cleaning(db,meal)

@router.put("/api/poolCleaning/{id}", response_model=schema.PoolCleaningCreateResponse)
async def update_pool_cleaning(id: int, new_enrichment: schema.PoolCleaningBase ,db: AsyncSession = Depends(get_db)):
    elm = await cruds.get_pool_cleaning_by_id(id,db)
    if elm is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await cruds.update_pool_cleaning(db,new_enrichment,elm)

@router.delete("/api/poolCleaning/{id}")
async def delete_pool_cleaning(id: int, db: AsyncSession = Depends(get_db)):
    return await cruds.delete_pool_cleaning(id,db)
