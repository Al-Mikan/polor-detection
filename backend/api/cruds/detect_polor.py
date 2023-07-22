from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import DetectionPolor
from sqlalchemy import and_
from datetime import datetime
import api.schemas.detect_polor as schema

async def get_detect_polor(date,db: AsyncSession):
    stmt = select(DetectionPolor.id, DetectionPolor.polorId).where(
        and_(
            DetectionPolor.date == date,
        )
    ).order_by(DetectionPolor.id)

    result = await db.execute(stmt)
    detection_polors = result.fetchall()

    formatted_detection_polors = []
    for detection_time in detection_polors:
        formatted_detection_polors.append(
            {
                "id": detection_time.id,
                "polorId": detection_time.polorId,
            }
        )
    return formatted_detection_polors

# create 
async def create_detectionPolor(db: AsyncSession, detection_polor_create: schema.DetectionPolorCreate):
    new_enrichment = DetectionPolor(
        polorId=detection_polor_create.polorId,
        date=detection_polor_create.date,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_enrichment)
    await db.commit()
    await db.refresh(new_enrichment)
    return new_enrichment

async def get_detectionPolor_by_id(id: int,db: AsyncSession):
    stmt = select(DetectionPolor).where(DetectionPolor.id == id)
    result = await db.execute(stmt)
    detectionPolor = result.scalar_one_or_none()
    return detectionPolor

# update 
async def update_detectionPolor(db: AsyncSession, detectionPolor_update: schema.DetectionPolorCreate, original: DetectionPolor):

    original.date = detectionPolor_update.date
    original.polorId = detectionPolor_update.polorId
    original.updatedAt = datetime.now()
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original
