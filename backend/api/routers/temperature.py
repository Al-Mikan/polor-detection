from fastapi import APIRouter, Query, HTTPException
from datetime import date,time,datetime
from typing import List

router = APIRouter()

import api.schemas.temperature as schema

# ダミーデータ
temperature_data = [
    {"id": 1, "polorId": 1, "date": date(2023, 6, 1), "time": time(10, 0,0), "temperature": 36.5},
    {"id": 2, "polorId": 1, "date": date(2023, 6, 1), "time": time(12, 0,0), "temperature": 36.7},
    {"id": 3, "polorId": 1, "date": date(2023, 6, 1), "time": time(16, 20,0), "temperature": 36.8},
    {"id": 4, "polorId": 1, "date": date(2023, 6, 2), "time": time(12, 30,30), "temperature": 36.6},
    {"id": 5, "polorId": 2, "date": date(2023, 6, 3), "time": time(15, 45,23), "temperature": 36.5}
]

@router.get("/temperature/{polorId}", response_model=List[schema.Temperature])
async def get_meals(polorId: int, date: str = Query(...)):
    try:
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        filtered_data = [item for item in temperature_data if item["polorId"] == polorId and item["date"] == requested_date]
        return filtered_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
