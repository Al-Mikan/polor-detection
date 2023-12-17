from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import Video
import api.schemas.video as schema
from sqlalchemy import and_
from datetime import datetime
import os
from fastapi import UploadFile


async def get_video(date, db: AsyncSession):
    stmt = (
        select(Video.id, Video.videoPath, Video.videoStartTime, Video.cageId)
        .where(and_(Video.date == date))
        .order_by(Video.id)
    )

    result = await db.execute(stmt)
    elms = result.fetchall()

    formatted_elms = []
    for elm in elms:
        formatted_elms.append(
            {
                "id": elm.id,
                "cageId": elm.cageId,
                "videoPath": elm.videoPath,
                "videoStartTime": elm.videoStartTime,
            }
        )
    return formatted_elms


# create meal
async def create_video(
    db: AsyncSession,
    date: str,
    cageId: int,
    videoStartTime: int,
    video: UploadFile,
):
    content = await video.read()
    print(video.filename)
    if video.filename is None:
        pass
    # 動画をmediaフォルダに保存
    save_path = "./api/media/videos"
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    video_path = save_path + "/" + video.filename
    with open(video_path, "wb") as f:
        f.write(content)

    new_video = Video(
        cageId=cageId,
        date=date,
        videoStartTime=videoStartTime,
        videoPath=video_path,
        createdAt=datetime.now(),
        updatedAt=datetime.now(),
    )
    db.add(new_video)
    await db.commit()
    await db.refresh(new_video)
    return new_video


# get by id
# async def get_training_by_id(id: int, db: AsyncSession):
#     stmt = select(Video).where(Video.id == id)
#     result = await db.execute(stmt)
#     video = result.scalar_one_or_none()
#     return video


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
