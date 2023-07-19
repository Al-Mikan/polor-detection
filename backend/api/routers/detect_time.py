from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.detect_time as schema
from api.cruds.detect_time import get_detect_time
from api.db import get_db

@router.get("/detectionTime", response_model=List[schema.DetectionTime])
async def get_detection_time(date: str = Query(...), db: AsyncSession = Depends(get_db)):
    return await get_detect_time(date,db)
