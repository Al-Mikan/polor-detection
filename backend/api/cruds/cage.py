from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Cage
from datetime import datetime
import api.schemas.cage as schema


async def get_cages(db: AsyncSession):
    stmt = select(
        Cage.id,
        Cage.cageName,
    ).order_by(Cage.id)

    result = await db.execute(stmt)
    cages = result.fetchall()

    formatted_cages = []
    for cage in cages:
        formatted_cages.append({"id": cage.id, "cageName": cage.cageName})

    return formatted_cages


async def create_cage(cage_create: schema.CageCreate, db: AsyncSession):
    new_cage = Cage(
        cageName=cage_create.cageName,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_cage)
    await db.commit()
    await db.refresh(new_cage)
    return new_cage


async def update_cage(cage_id: int, new_cage: schema.CageBase, db: AsyncSession):
    stmt = select(Cage).where(Cage.id == cage_id)
    result = await db.execute(stmt)
    cage = result.scalar_one_or_none()
    cage.cageName = new_cage.cageName
    cage.updatedAt = datetime.now()

    await db.commit()
    await db.refresh(cage)
    return cage


async def delete_cage(cage_id: int, db: AsyncSession):
    stmt = select(Cage).where(Cage.id == cage_id)
    result = await db.execute(stmt)
    cage = result.scalars().first()
    if cage is None:
        return None
    await db.delete(cage)
    await db.commit()
    return cage
