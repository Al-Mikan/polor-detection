from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
router = APIRouter()

from api.db import get_db
import api.schemas.detect_polor as schema
import api.cruds.detect_polor as detectionPolor_crud


@router.get("/detectionPolor", response_model=List[schema.DetectionPolor])
async def get_detectionPolors(date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await detectionPolor_crud.get_detect_polor(requested_date,db)

@router.post("/detectionPolor", response_model=schema.DetectionPolorCreateResponse)
async def create_detectionPolor(meal: schema.DetectionPolorCreate,db: AsyncSession = Depends(get_db)):
    return await detectionPolor_crud.create_detectionPolor(db,meal)

@router.put("/detectionPolor/{id}", response_model=schema.DetectionPolorCreateResponse)
async def update_detectionPolor(id: int, new_enrichment: schema.DetectionPolorCreate ,db: AsyncSession = Depends(get_db)):
    detection_polor = await detectionPolor_crud.get_detectionPolor_by_id(id,db)
    if detection_polor is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await detectionPolor_crud.update_detectionPolor(db,new_enrichment,detection_polor)
