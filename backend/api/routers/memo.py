from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query,HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.memo as schema
import api.cruds.memo as crud

@router.get("/api/memo/{polorId}", response_model=List[schema.Memo])
async def get_memos(polorId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)):
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        return await crud.get_memo(requested_date,polorId,db)


@router.post("/api/memo", response_model=schema.MemoCreateResponse)
async def create_memo(meal: schema.MemoCreate,db: AsyncSession = Depends(get_db)):
    return await crud.create_memo(db,meal)

@router.put("/api/memo/{id}", response_model=schema.MemoCreateResponse)
async def update_memo(id: int, new_meal: schema.MemoBase ,db: AsyncSession = Depends(get_db)):
    enrichment = await crud.get_memo_by_id(id,db)
    if enrichment is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await crud.update_memo(db,new_meal,enrichment)

@router.delete("/api/memo/{id}")
async def delete_memo(id: int, db: AsyncSession = Depends(get_db)):
    return await crud.delete_memo(id,db)
