from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Enrichment
import api.schemas.enrichment as schema
from sqlalchemy import and_
from datetime import datetime


# get
async def get_enrichments(date, polorId, db: AsyncSession):
    stmt = (
        select(
            Enrichment.id,
            Enrichment.enrichment,
        )
        .where(and_(Enrichment.date == date, Enrichment.polorId == polorId))
        .order_by(Enrichment.id)
    )

    result = await db.execute(stmt)
    enrichments = result.fetchall()

    formatted_enrichments = []
    for enrichment in enrichments:
        formatted_enrichments.append(
            {
                "id": enrichment.id,
                "enrichment": enrichment.enrichment,
            }
        )
    return formatted_enrichments


# create
async def create_enrichment(
    db: AsyncSession, enrichment_create: schema.EnrichmentCreate
):
    new_enrichment = Enrichment(
        polorId=enrichment_create.polorId,
        date=enrichment_create.date,
        enrichment=enrichment_create.enrichment,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_enrichment)
    await db.commit()
    await db.refresh(new_enrichment)
    return new_enrichment


# get by id
async def get_enrichment_by_id(id: int, db: AsyncSession):
    stmt = select(Enrichment).where(Enrichment.id == id)
    result = await db.execute(stmt)
    enrichment = result.scalar_one_or_none()
    return enrichment


# update
async def update_enrichment(
    db: AsyncSession, enrichment_update: schema.EnrichmentBase, original: Enrichment
):
    original.enrichment = enrichment_update.enrichment
    original.updatedAt = datetime.now()
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete
async def delete_enrichment(id: int, db: AsyncSession):
    stmt = select(Enrichment).where(Enrichment.id == id)
    result = await db.execute(stmt)
    enrichment = result.scalars().first()

    if enrichment is None:
        return None

    await db.delete(enrichment)
    await db.commit()
    return enrichment
