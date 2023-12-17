from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.polar_cage_log as schema
import api.cruds.polar_cage_log as polar_cage_log


@router.get("/api/polarCageLog", response_model=List[schema.PolarCageLog])
async def get_polar_cage_log(
    date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await polar_cage_log.get_polar_cage_log(requested_date, db)


@router.post("/api/polarCageLog", response_model=schema.PolarCageLogCreateResponse)
async def create_polar_cage_log(
    meal: schema.PolarCageLogCreate, db: AsyncSession = Depends(get_db)
):
    return await polar_cage_log.create_polar_cage_log(db, meal)


@router.put("/api/polarCageLog/{id}", response_model=schema.PolarCageLogCreateResponse)
async def update_polar_cage_log(
    id: int,
    new_enrichment: schema.PolarCageLogCreate,
    db: AsyncSession = Depends(get_db),
):
    elm = await polar_cage_log.get_polar_cage_log_by_id(id, db)
    if elm is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await polar_cage_log.update_polar_cage_log(db, new_enrichment, elm)
