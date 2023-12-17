from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.polar as schema
from api.cruds.polar import get_polars
from api.db import get_db


# helloworld
@router.get("/api")
async def hello():
    return {"message": "Hello World"}


@router.get("/api/polars", response_model=List[schema.Polar])
async def polars(db: AsyncSession = Depends(get_db)):
    return await get_polars(db)
