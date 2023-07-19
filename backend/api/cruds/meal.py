from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Meal
import api.schemas.meal as schema
from sqlalchemy import and_
from datetime import datetime

async def get_meals(date,polorId,db: AsyncSession):
    stmt = select(Meal.id,  Meal.time, Meal.meal, Meal.weight).where(
        and_(
            Meal.date == date,
            Meal.polorId == polorId
        )
    ).order_by(Meal.id)

    result = await db.execute(stmt)
    meals = result.fetchall()

    formatted_meals = []
    for meal in meals:
        formatted_meals.append(
            {
                "id": meal.id,
                "time": meal.time,
                "meal": meal.meal,
                "weight": meal.weight,
            }
        )
    return formatted_meals

# create meal
async def create_meal(db: AsyncSession, meal_create: schema.MealCreate):
    new_meal = Meal(
        polorId=meal_create.polorId,
        date=meal_create.date,
        time=meal_create.time,
        meal=meal_create.meal,
        weight=meal_create.weight,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_meal)
    await db.commit()
    await db.refresh(new_meal)
    return new_meal

# get by id
async def get_meal_by_id(id: int,db: AsyncSession):
    stmt = select(Meal).where(Meal.id == id)
    result = await db.execute(stmt)
    meal = result.scalar_one_or_none()
    return meal

# update 
async def update_meal(db: AsyncSession, meal_update: schema.MealBase, original: Meal):

    original.time = meal_update.time
    original.meal = meal_update.meal
    original.weight = meal_update.weight
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_meal(id: int,db: AsyncSession):
    stmt = select(Meal).where(Meal.id == id)
    result = await db.execute(stmt)
    meal = result.scalars().first()

    if meal is None:
        return None

    await db.delete(meal)
    await db.commit()
    return meal
    

