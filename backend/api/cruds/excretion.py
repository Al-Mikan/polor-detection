from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Excretion
import api.schemas.excretion as schema
from sqlalchemy import and_
from datetime import datetime


async def get_excretion(date, polarId, db: AsyncSession):
    stmt = (
        select(Excretion.id, Excretion.number, Excretion.status)
        .where(and_(Excretion.date == date, Excretion.polarId == polarId))
        .order_by(Excretion.id)
    )

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "number": elm.number,
                "status": elm.status,
            }
        )
    return formatted_elms


# create meal
async def create_excretion(db: AsyncSession, create_elm: schema.ExcretionCreate):
    new_elm = Excretion(
        polarId=create_elm.polarId,
        date=create_elm.date,
        number=create_elm.number,
        status=create_elm.status,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_elm)
    await db.commit()
    await db.refresh(new_elm)
    return new_elm


# get by id
async def get_excretion_by_id(id: int, db: AsyncSession):
    stmt = select(Excretion).where(Excretion.id == id)
    result = await db.execute(stmt)
    elm = result.scalar_one_or_none()
    return elm


# update
async def update_excretion(
    db: AsyncSession, update_elm: schema.ExcretionBase, original: Excretion
):
    original.number = update_elm.number
    original.status = update_elm.status
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_excretion(id: int, db: AsyncSession):
    stmt = select(Excretion).where(Excretion.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
