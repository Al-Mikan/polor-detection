from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Polor


async def get_polors(db: AsyncSession):
    stmt = select(
        Polor.id,
        Polor.polorName,
    ).order_by(Polor.id)

    result = await db.execute(stmt)
    polors = result.fetchall()

    formatted_polors = []
    for polor in polors:
        formatted_polors.append({"id": polor.id, "polorName": polor.polorName})

    return formatted_polors
