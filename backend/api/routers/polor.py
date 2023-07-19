from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.polor as schema
from api.cruds.polor import get_polors
from api.db import get_db


@router.get("/polors", response_model=List[schema.Polor])
async def polors(db: AsyncSession = Depends(get_db)):
    return await get_polors(db)
