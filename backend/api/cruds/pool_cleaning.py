from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import PoolCleaning
import api.schemas.pool_cleaning as schema
from sqlalchemy import and_
from datetime import datetime

# get
async def get_pool_cleaning(date,polorId,db: AsyncSession):
    stmt = select(PoolCleaning.id, PoolCleaning.poolCleaning).where(
        and_(
            PoolCleaning.date == date,
            PoolCleaning.polorId == polorId
        )
    ).order_by(PoolCleaning.id)

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elm = []
    for elm in elms:
        formatted_elm.append(
            {
                "id": elm.id,
                "poolCleaning": elm.poolCleaning,
            }
        )
    return formatted_elm

# create 
async def create_pool_cleaning(db: AsyncSession, create_elm: schema.PoolCleaningCreate):
    new_temp = PoolCleaning(
        polorId=create_elm.polorId,
        poolCleaning=create_elm.poolCleaning,
        date=create_elm.date,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_temp)
    await db.commit()
    await db.refresh(new_temp)
    return new_temp

# get by id
async def get_pool_cleaning_by_id(id: int,db: AsyncSession):
    stmt = select(PoolCleaning).where(PoolCleaning.id == id)
    result = await db.execute(stmt)
    elm = result.scalar_one_or_none()
    return elm

# update 
async def update_pool_cleaning(db: AsyncSession, update_elm: schema.PoolCleaningBase, original:PoolCleaning):

    original.poolCleaning = update_elm.poolCleaning
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original

# delete 
async def delete_pool_cleaning(id: int,db: AsyncSession):
    stmt = select(PoolCleaning).where(PoolCleaning.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
    

