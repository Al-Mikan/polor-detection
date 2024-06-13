from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import AnimalCageLog
import api.schemas.animal_cage_log as schema
from sqlalchemy import and_
from datetime import datetime


# get
async def get_animal_cage_log(date, db: AsyncSession):
    stmt = (
        select(AnimalCageLog.id, AnimalCageLog.animalId, AnimalCageLog.cageId)
        .where(
            and_(
                AnimalCageLog.date == date,
            )
        )
        .order_by(AnimalCageLog.id)
    )

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elm = []
    for elm in elms:
        formatted_elm.append(
            {
                "id": elm.id,
                "animalId": elm.animalId,
                "cageId": elm.cageId,
            }
        )
    return formatted_elm


# create
async def create_animal_cage_log(
    db: AsyncSession, create_elm: schema.AnimalCageLogCreate
):
    new_temp = AnimalCageLog(
        animalId=create_elm.animalId,
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
async def get_animal_cage_log_by_id(id: int, db: AsyncSession):
    stmt = select(AnimalCageLog).where(AnimalCageLog.id == id)
    result = await db.execute(stmt)
    elm = result.scalar_one_or_none()
    return elm


# update
async def update_animal_cage_log(
    db: AsyncSession, update_elm: schema.AnimalCageLogBase, original: AnimalCageLog
):
    original.animalId = update_elm.animalId
    original.cageId = update_elm.cageId
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete
async def delete_animal_cage_log(id: int, db: AsyncSession):
    stmt = select(AnimalCageLog).where(AnimalCageLog.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
