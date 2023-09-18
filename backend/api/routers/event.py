from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

from api.db import get_db
import api.schemas.event as schema
import api.cruds.event as event_crud


@router.get("/api/events/{polorId}", response_model=List[schema.Event])
async def get_events(polorId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await event_crud.get_events(requested_date,polorId,db)

@router.post("/api/events", response_model=schema.EventCreateResponse)
async def create_event(meal: schema.EventCreate,db: AsyncSession = Depends(get_db)):
    return await event_crud.create_event(db,meal)

@router.put("/api/events/{id}", response_model=schema.EventCreateResponse)
async def update_event(id: int, new_event: schema.EventBase ,db: AsyncSession = Depends(get_db)):
    event = await event_crud.get_event_by_id(id,db)
    if event is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await event_crud.update_event(db,new_event,event)

@router.delete("/api/events/{id}")
async def delete_event(id: int, db: AsyncSession = Depends(get_db)):
    return await event_crud.delete_event(id,db)
