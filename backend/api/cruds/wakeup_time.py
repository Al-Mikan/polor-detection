from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import WakeUpTime
import api.schemas.wakeup_time as schema
from sqlalchemy import and_
from datetime import datetime

async def get_wakeup_time(date,polorId,db: AsyncSession):
    stmt = select(WakeUpTime.id, WakeUpTime.time).where(
        and_(
            WakeUpTime.date == date,
            WakeUpTime.polorId == polorId
        )
    ).order_by(WakeUpTime.id)

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "time": elm.time,
            }
        )
    return formatted_elms

# create meal
async def create_wakeup_time(db: AsyncSession,create_elm: schema.WakeUpTimeCreate):
    new_elm = WakeUpTime(
        polorId=create_elm.polorId,
        date=create_elm.date,
        time=create_elm.time,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_elm)
    await db.commit()
    await db.refresh(new_elm)
    return new_elm

# get by id
async def get_wakeup_time_by_id(id: int,db: AsyncSession):
    stmt = select(WakeUpTime).where(WakeUpTime.id == id)
    result = await db.execute(stmt)
    elm = result.scalar_one_or_none()
    return elm

# update 
async def update_wakeup_time(db: AsyncSession, update_elm: schema.WakeUpTimeBase, original: WakeUpTime):

    original.time = update_elm.time
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_wakeup_time(id: int,db: AsyncSession):
    stmt = select(WakeUpTime).where(WakeUpTime.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
    

