from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.classification as schema
from api.cruds.classification import get_detect_time
from api.db import get_db


@router.get("/api/classification", response_model=List[schema.DetectionTime])
async def get_classification(
    date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    return await get_detect_time(date, db)
