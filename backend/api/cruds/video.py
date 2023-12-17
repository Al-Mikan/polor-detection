from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Video
import api.schemas.video as schema
from sqlalchemy import and_
from datetime import datetime
import os
from fastapi import APIRouter, Depends, Query, HTTPException, UploadFile, Form


async def get_video(date, polorId, db: AsyncSession):
    stmt = (
        select(Video.id, Video.video_path)
        .where(and_(Video.date == date, Video.polorId == polorId))
        .order_by(Video.id)
    )

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "video_path": elm.video_path,
            }
        )
    return formatted_elms


# create meal
async def create_video(
    db: AsyncSession,
    date: str,
    polorId: int,
    video: UploadFile,
):
    # 動画をmediaフォルダに保存
    print(video.filename)
    exit()
    video_dir = "./media/video"
    if not os.path.exists(video_dir):
        os.makedirs(video_dir)
    with open(f"{video_dir}/{create_elm.UploadFile.filename}", "wb") as buffer:
        buffer.write(create_elm.UploadFile.file.read())

    new_video = Video(
        polorId=create_elm.polorId,
        date=create_elm.date,
        video_path=create_elm.video_path,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_video)
    await db.commit()
    await db.refresh(new_video)
    return new_video


# get by id
async def get_training_by_id(id: int, db: AsyncSession):
    stmt = select(Video).where(Video.id == id)
    result = await db.execute(stmt)
    video = result.scalar_one_or_none()
    return video


# # update
# async def update_video(db: AsyncSession, update: schema.VideoBase, original: Video):
#     original.video_path = update.video_path
#     original.updatedAt = datetime.now()

#     db.add(original)
#     await db.commit()
#     await db.refresh(original)
#     return original


# # delete
# async def delete_video(id: int, db: AsyncSession):
#     stmt = select(Video).where(Video.id == id)
#     result = await db.execute(stmt)
#     elm = result.scalars().first()

#     if elm is None:
#         return None

#     await db.delete(elm)
#     await db.commit()
#     return elm
