from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

import api.schemas.animal as schema
import api.cruds.animal as animal_crud
from api.db import get_db


# helloworld
@router.get("/api")
async def hello():
    return {"message": "Hello World"}


@router.get("/api/animals", response_model=List[schema.Animal])
async def get_animals(db: AsyncSession = Depends(get_db)):
    return await animal_crud.get_animals(db)


@router.post("/api/animals", response_model=schema.AnimalCreateResponse)
async def create_animals(
    animal: schema.AnimalCreate, db: AsyncSession = Depends(get_db)
):
    return await animal_crud.create_animal(db, animal)


@router.put("/api/animals/{id}", response_model=schema.AnimalCreateResponse)
async def update_animals(
    id: int, animal: schema.AnimalCreate, db: AsyncSession = Depends(get_db)
):
    original = await animal_crud.get_animal_by_id(id, db)
    if original is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return await animal_crud.update_animal(db, animal, original)


@router.delete("/api/animals/{id}", status_code=204)
async def delete_animal(id: int, db: AsyncSession = Depends(get_db)):
    success = await animal_crud.delete_animal(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Animal not found")
    return {"message": "Animal deleted successfully"}
