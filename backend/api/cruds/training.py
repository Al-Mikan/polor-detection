from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Training
import api.schemas.training as schema
from sqlalchemy import and_
from datetime import datetime

async def get_training(date,polorId,db: AsyncSession):
    stmt = select(Training.id, Training.training).where(
        and_(
            Training.date == date,
            Training.polorId == polorId
        )
    ).order_by(Training.id)

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "date": elm.date,
                "training": elm.training,
            }
        )
    return formatted_elms

# create meal
async def create_training(db: AsyncSession,create_elm: schema.TrainingCreate):
    new_meal = Training(
        polorId=create_elm.polorId,
        date=create_elm.date,
        training=create_elm.training,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_meal)
    await db.commit()
    await db.refresh(new_meal)
    return new_meal

# get by id
async def get_training_by_id(id: int,db: AsyncSession):
    stmt = select(Training).where(Training.id == id)
    result = await db.execute(stmt)
    meal = result.scalar_one_or_none()
    return meal

# update 
async def update_training(db: AsyncSession, meal_update: schema.TrainingBase, original: Training):

    original.expropriation = meal_update.expropriation
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_training(id: int,db: AsyncSession):
    stmt = select(Training).where(Training.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
    

