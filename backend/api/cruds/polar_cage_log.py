from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import PolarCageLog
import api.schemas.polar_cage_log as schema
from sqlalchemy import and_
from datetime import datetime


# get
async def get_polar_cage_log(date, db: AsyncSession):
    stmt = (
        select(PolarCageLog.id, PolarCageLog.polarId, PolarCageLog.cageId)
        .where(
            and_(
                PolarCageLog.date == date,
            )
        )
        .order_by(PolarCageLog.id)
    )

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elm = []
    for elm in elms:
        formatted_elm.append(
            {
                "id": elm.id,
                "polarId": elm.polarId,
                "cageId": elm.cageId,
            }
        )
    return formatted_elm


# create
async def create_polar_cage_log(
    db: AsyncSession, create_elm: schema.PolarCageLogCreate
):
    new_temp = PolarCageLog(
        polarId=create_elm.polarId,
        cageId=create_elm.cageId,
        date=create_elm.date,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_temp)
    await db.commit()
    await db.refresh(new_temp)
    return new_temp


# get by id
async def get_polar_cage_log_by_id(id: int, db: AsyncSession):
    stmt = select(PolarCageLog).where(PolarCageLog.id == id)
    result = await db.execute(stmt)
    elm = result.scalar_one_or_none()
    return elm


# update
async def update_polar_cage_log(
    db: AsyncSession, update_elm: schema.PolarCageLogBase, original: PolarCageLog
):
    original.polarId = update_elm.polarId
    original.cageId = update_elm.cageId
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete
async def delete_polar_cage_log(id: int, db: AsyncSession):
    stmt = select(PolarCageLog).where(PolarCageLog.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
