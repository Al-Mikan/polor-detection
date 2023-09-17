from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Memo
import api.schemas.memo as schema
from sqlalchemy import and_
from datetime import datetime

async def get_Memo(date,polorId,db: AsyncSession):
    stmt = select(Memo.id, Memo.memo).where(
        and_(
            Memo.date == date,
            Memo.polorId == polorId
        )
    ).order_by(Memo.id)

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "date": elm.date,
                "memo": elm.memo,
            }
        )
    return formatted_elms

# create meal
async def create_Memo(db: AsyncSession,create_elm: schema.MemoCreate):
    new_elm = Memo(
        polorId=create_elm.polorId,
        date=create_elm.date,
        memo=create_elm.memo,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_elm)
    await db.commit()
    await db.refresh(new_elm)
    return new_elm

# get by id
async def get_Memo_by_id(id: int,db: AsyncSession):
    stmt = select(Memo).where(Memo.id == id)
    result = await db.execute(stmt)
    elm = result.scalar_one_or_none()
    return elm

# update 
async def update_Memo(db: AsyncSession, update_elm: schema.MemoBase, original: Memo):

    original.memo = update_elm.memo
    original.updatedAt = datetime.now()

    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


# delete meal
async def delete_Memo(id: int,db: AsyncSession):
    stmt = select(Memo).where(Memo.id == id)
    result = await db.execute(stmt)
    elm = result.scalars().first()

    if elm is None:
        return None

    await db.delete(elm)
    await db.commit()
    return elm
    

