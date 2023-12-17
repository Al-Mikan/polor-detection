from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Temperature
import api.schemas.temperature as schema
from sqlalchemy import and_
from datetime import datetime


# get
async def get_temperatures(date, polarId, db: AsyncSession):
    stmt = (
        select(Temperature.id, Temperature.time, Temperature.temperature)
        .where(and_(Temperature.date == date, Temperature.polarId == polarId))
        .order_by(Temperature.id)
    )

    result = await db.execute(stmt)
    temperatures = result.fetchall()

    formatted_temperatures = []
    for temperature in temperatures:
        formatted_temperatures.append(
            {
                "id": temperature.id,
                "time": temperature.time,
                "temperature": temperature.temperature,
            }
        )
    return formatted_temperatures


# create
async def create_temperature(db: AsyncSession, temp_create: schema.TemperatureCreate):
    new_temp = Temperature(
        polarId=temp_create.polarId,
        date=temp_create.date,
        time=temp_create.time,
        temperature=temp_create.temperature,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_temp)
    await db.commit()
    await db.refresh(new_temp)
    return new_temp


# get by id
async def get_temperature_by_id(id: int, db: AsyncSession):
    stmt = select(Temperature).where(Temperature.id == id)
    result = await db.execute(stmt)
    enrichment = result.scalar_one_or_none()
    return enrichment


# update
async def update_temperature(
    db: AsyncSession, temperature_update: schema.TemperatureBase, original: Temperature
):
    original.time = temperature_update.time
    original.temperature = temperature_update.temperature
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete
async def delete_temperature(id: int, db: AsyncSession):
    stmt = select(Temperature).where(Temperature.id == id)
    result = await db.execute(stmt)
    temp = result.scalars().first()

    if temp is None:
        return None

    await db.delete(temp)
    await db.commit()
    return temp
