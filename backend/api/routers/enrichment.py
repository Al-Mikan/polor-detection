from datetime import date, datetime, time
from typing import List

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

from api.db import get_db
import api.schemas.enrichment as schema
import api.cruds.enrichment as enrichment_crud


@router.get("/api/enrichments/{animalId}", response_model=List[schema.Enrichment])
async def get_enrichments(
    animalId: int, date: str = Query(...), db: AsyncSession = Depends(get_db)
):
    requested_date = datetime.strptime(date, "%Y-%m-%d").date()
    return await enrichment_crud.get_enrichments(requested_date, animalId, db)


@router.post("/api/enrichments", response_model=schema.EnrichmentCreateResponse)
async def create_enrichment(
    enrichment: schema.EnrichmentCreate, db: AsyncSession = Depends(get_db)
):
    return await enrichment_crud.create_enrichment(db, enrichment)


@router.put("/api/enrichments/{id}", response_model=schema.EnrichmentCreateResponse)
async def update_enrichment(
    id: int, new_enrichment: schema.EnrichmentBase, db: AsyncSession = Depends(get_db)
):
    enrichment = await enrichment_crud.get_enrichment_by_id(id, db)
    if enrichment is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return await enrichment_crud.update_enrichment(db, new_enrichment, enrichment)


@router.delete("/api/enrichments/{id}")
async def delete_enrichment(id: int, db: AsyncSession = Depends(get_db)):
    return await enrichment_crud.delete_enrichment(id, db)
