from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Polar


async def get_polars(db: AsyncSession):
    stmt = select(
        Polar.id,
        Polar.polarName,
    ).order_by(Polar.id)

    result = await db.execute(stmt)
    polars = result.fetchall()

    formatted_polars = []
    for polar in polars:
        formatted_polars.append({"id": polar.id, "polarName": polar.polarName})

    return formatted_polars
