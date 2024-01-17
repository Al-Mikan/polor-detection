from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import os
import datetime

from api.models.model import Classification
from sqlalchemy import and_
import api.schemas.classification as schema
from fastapi import UploadFile

SAVE_PATH = "../media/videos"


async def get_classification(date, db: AsyncSession):
    stmt = (
        select(
            Classification.id,
            Classification.classification,
            Classification.startTime,
            Classification.endTime,
            Classification.cageId,
        )
        .where(
            and_(
                Classification.date == date,
            )
        )
        .order_by(Classification.id)
    )

    result = await db.execute(stmt)
    detection_times = result.fetchall()

    formatted_detection_times = []
    for detection_time in detection_times:
        formatted_detection_times.append(
            {
                "id": detection_time.id,
                "cageId": detection_time.cageId,
                "classification": detection_time.classification,
                "startTime": detection_time.startTime,
                "endTime": detection_time.endTime,
            }
        )
    return formatted_detection_times
