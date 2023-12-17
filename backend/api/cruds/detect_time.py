from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import os

from api.models.model import DetectionTime
from sqlalchemy import and_
import api.schemas.detect_time as schema
from fastapi import UploadFile

SAVE_PATH = "../media/videos"


async def get_detect_time(date, db: AsyncSession):
    stmt = (
        select(
            DetectionTime.id,
            DetectionTime.startTime,
            DetectionTime.endTime,
            DetectionTime.cageId,
        )
        .where(
            and_(
                DetectionTime.date == date,
            )
        )
        .order_by(DetectionTime.id)
    )

    result = await db.execute(stmt)
    detection_times = result.fetchall()

    formatted_detection_times = []
    for detection_time in detection_times:
        formatted_detection_times.append(
            {
                "id": detection_time.id,
                "cageId": detection_time.cageId,
                "startTime": detection_time.startTime,
                "endTime": detection_time.endTime,
            }
        )
    return formatted_detection_times


async def create_detect_time(video: UploadFile, db: AsyncSession):
    content = await video.read()
    filename = os.path.splitext(content.filename)[1]

    # ディレクトリが存在しない場合、作成する
    if not os.path.exists(SAVE_PATH):
        os.makedirs(SAVE_PATH)

    save_path = os.path.join(SAVE_PATH, filename)
    with open(save_path, "wb") as f:
        f.write(content)

    # post = DetectionTime(
    #     startTime=schema.startTime,
    #     endTime=schema.endTime,
    #     date=schema.date,
    #     cageId=schema.cageId,
    # )
    # db.add(post)
    # db.commit()

    pass
