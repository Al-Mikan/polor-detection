from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.wakeup_time as schema
import api.cruds.wakeup_time as cruds


@router.get("/api/wakeupTime/{polarId}", response_model=List[schema.WakeUpTime])
async def get_wakeup_time(
    polarId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await cruds.get_wakeup_time(requested_date, polarId, db)


@router.post("/api/wakeupTime", response_model=schema.WakeUpTimeCreateResponse)
async def create_wakeup_time(
    elm: schema.WakeUpTimeCreate, db: AsyncSession = Depends(get_db)
):
    return await cruds.create_wakeup_time(db, elm)


@router.put("/api/wakeupTime/{id}", response_model=schema.WakeUpTimeCreateResponse)
async def update_wakeup_time(
    id: int, new_el: schema.WakeUpTimeBase, db: AsyncSession = Depends(get_db)
):
    elm = await cruds.get_wakeup_time_by_id(id, db)
    if elm is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await cruds.update_wakeup_time(db, new_el, elm)


@router.delete("/api/wakeupTime/{id}")
async def delete_wakeup_time(id: int, db: AsyncSession = Depends(get_db)):
    return await cruds.delete_wakeup_time(id, db)
