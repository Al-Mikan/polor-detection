from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Expropriation
import api.schemas.expropriation as schema
from sqlalchemy import and_
from datetime import datetime

async def get_expropriation(date,polorId,db: AsyncSession):
    stmt = select(Expropriation.id, Expropriation.expropriation).where(
        and_(
            Expropriation.date == date,
            Expropriation.polorId == polorId
        )
    ).order_by(Expropriation.id)

    result = await db.execute(stmt)
    els = result.fetchall()

    formatted_meals = []
    for el in els:
        formatted_meals.append(
            {
                "id": el.id,
                "expropriation": el.expropriation,
            }
        )
    return formatted_meals

# create meal
async def create_expropriation(db: AsyncSession,create_elm: schema.ExpropriationCreate):
    new_meal = Expropriation(
        polorId=create_elm.polorId,
        date=create_elm.date,
        expropriation=create_elm.expropriation,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_meal)
    await db.commit()
    await db.refresh(new_meal)
    return new_meal

# get by id
async def get_expropriation_by_id(id: int,db: AsyncSession):
    stmt = select(Expropriation).where(Expropriation.id == id)
    result = await db.execute(stmt)
    meal = result.scalar_one_or_none()
    return meal

# update 
async def update_expropriation(db: AsyncSession, update: schema.ExpropriationBase, original: Expropriation):

    original.expropriation = update.expropriation
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_expropriation(id: int,db: AsyncSession):
    stmt = select(Expropriation).where(Expropriation.id == id)
    result = await db.execute(stmt)
    meal = result.scalars().first()

    if meal is None:
        return None

    await db.delete(meal)
    await db.commit()
    return meal
    

