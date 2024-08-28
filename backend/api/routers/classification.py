from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.classification as schema
import api.cruds.classification as classification_crud
from api.db import get_db


@router.get("/api/classification", response_model=List[schema.Classification])
async def get_classification(
    date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    return await classification_crud.get_classification(date, db)


@router.post("/api/classification", response_model=schema.ClassificationCreateResponse)
async def create_classification(
    classification: schema.ClassificationCreate, db: AsyncSession = Depends(get_db)
):
    return await classification_crud.create_classification(db, classification)
