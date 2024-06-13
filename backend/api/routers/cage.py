from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.cage as schema
import api.cruds.cage as cage_crud
from api.db import get_db


@router.get("/api/cages", response_model=List[schema.Cage])
async def cages(db: AsyncSession = Depends(get_db)):
    return await cage_crud.get_cages(db)


@router.post("/api/cages", response_model=schema.CageCreateResponse)
async def create_cage(cage: schema.CageCreate, db: AsyncSession = Depends(get_db)):
    return await cage_crud.create_cage(cage, db)


@router.put("/api/cages/{id}", response_model=schema.CageCreateResponse)
async def update_cage(
    id: int, cage: schema.CageBase, db: AsyncSession = Depends(get_db)
):
    return await cage_crud.update_cage(id, cage, db)


@router.delete("/api/cages/{id}")
async def delete_cage(id: int, db: AsyncSession = Depends(get_db)):
    return await cage_crud.delete_cage(id, db)
