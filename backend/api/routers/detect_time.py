from fastapi import APIRouter, Query, HTTPException
from datetime import date,time,datetime
from typing import List

router = APIRouter()

import api.schemas.detect_time as schema

# ダミーデータ
detection_time_data = [
    {"id": 1, "polorId": 1, "date": date(2023, 6, 1), "startTime": time(10, 0,0), "endTime": time(11, 0,0)},
    {"id": 2, "polorId": 1, "date": date(2023, 6, 1), "startTime": time(12, 0,0), "endTime": time(12, 20,0)},
    {"id": 3, "polorId": None, "date": date(2023, 6, 1), "startTime": time(16, 20,0), "endTime": time(17, 0,0)},
    {"id": 4, "polorId": 1, "date": date(2023, 6, 2), "startTime": time(12, 30,30), "endTime": time(13, 30,20)},
    {"id": 5, "polorId": 2, "date": date(2023, 6, 3), "startTime": time(15, 45,23), "endTime": time(16, 45,12)}
]

@router.get("/detectionTime", response_model=List[schema.DetectionTime])
async def get_detection_time(date: str = Query(...)):
    try:
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        filtered_data = [item for item in detection_time_data if item["date"] == requested_date]
        return filtered_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))