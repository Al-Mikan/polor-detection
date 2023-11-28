from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Cage


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


def create_cage(cage_name: str, db: AsyncSession):
    cage = Cage(cageName=cage_name)
    db.add(cage)
    db.commit()
    db.refresh(cage)
    return cage


def update_cage(cage_id: int, cage_name: str, db: AsyncSession):
    stmt = select(Cage).where(Cage.id == cage_id)
    result = db.execute(stmt)
    cage = result.scalars().first()
    cage.cageName = cage_name
    db.commit()
    db.refresh(cage)
    return cage


def delete_cage(cage_id: int, db: AsyncSession):
    stmt = select(Cage).where(Cage.id == cage_id)
    result = db.execute(stmt)
    cage = result.scalars().first()
    db.delete(cage)
    db.commit()
    return cage
