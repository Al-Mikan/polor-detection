from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.cage as schema
from api.cruds.cage import get_cages
from api.db import get_db


@router.get("/api/cages", response_model=List[schema.Cage])
async def cages(db: AsyncSession = Depends(get_db)):
    return await get_cages(db)
