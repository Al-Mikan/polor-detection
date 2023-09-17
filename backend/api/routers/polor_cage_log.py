from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

from api.db import get_db
import api.schemas.polor_cage_log as schema
import api.cruds.polor_cage_log as polor_cage_log


@router.get("/polorCageLog", response_model=List[schema.PolorCageLog])
async def get_polor_cage_log(date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await polor_cage_log.get_polor_cage_log(requested_date,db)

@router.post("/polorCageLog", response_model=schema.PolorCageLogCreateResponse)
async def create_polor_cage_log(meal: schema.PolorCageLogCreate,db: AsyncSession = Depends(get_db)):
    return await polor_cage_log.create_polor_cage_log(db,meal)

@router.put("/polorCageLog/{id}", response_model=schema.PolorCageLogCreateResponse)
async def update_polor_cage_log(id: int, new_enrichment: schema.PolorCageLogCreate ,db: AsyncSession = Depends(get_db)):
    elm = await polor_cage_log.get_polor_cage_log_by_id(id,db)
    if elm is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await polor_cage_log.update_polor_cage_log(db,new_enrichment,elm)
