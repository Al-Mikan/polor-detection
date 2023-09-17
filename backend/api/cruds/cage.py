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
