from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.model import DetectionTime
from sqlalchemy import and_

async def get_detect_time(date,db: AsyncSession):
    stmt = select(DetectionTime.id, DetectionTime.polorId, DetectionTime.startTime, DetectionTime.endTime).where(
        and_(
            DetectionTime.date == date,
        )
    ).order_by(DetectionTime.id)

    result = await db.execute(stmt)
    detection_times = result.fetchall()

    formatted_detection_times = []
    for detection_time in detection_times:
        formatted_detection_times.append(
            {
                "id": detection_time.id,
                "polorId": detection_time.polorId,
                "startTime": detection_time.startTime,
                "endTime": detection_time.endTime,
            }
        )
    return formatted_detection_times
