from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Water
import api.schemas.water as schema
from sqlalchemy import and_
from datetime import datetime

async def get_water(date,polorId,db: AsyncSession):
    stmt = select(Water.id, Water.value).where(
        and_(
            Water.date == date,
            Water.polorId == polorId
        )
    ).order_by(Water.id)

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "value": elm.value,
            }
        )
    return formatted_elms

# create meal
async def create_water(db: AsyncSession,create_elm: schema.WaterCreate):
    new_elm = Water(
        polorId=create_elm.polorId,
        date=create_elm.date,
        value=create_elm.value,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_elm)
    await db.commit()
    await db.refresh(new_elm)
    return new_elm

# get by id
async def get_water_by_id(id: int,db: AsyncSession):
    stmt = select(Water).where(Water.id == id)
    result = await db.execute(stmt)
    meal = result.scalar_one_or_none()
    return meal

# update 
async def update_water(db: AsyncSession, update_elm: schema.WaterBase, original: Water):

    original.value = update_elm.value
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_water(id: int,db: AsyncSession):
    stmt = select(Water).where(Water.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
    

