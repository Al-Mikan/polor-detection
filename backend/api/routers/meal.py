from fastapi import APIRouter, Query, HTTPException
from datetime import date, datetime, time
from typing import List

router = APIRouter()

import api.schemas.meal as schema

meal_data = [
    {"id": 1, "polorId": 1, "date": date(2023, 6, 1), "time": time(10, 0), "meal": "Breakfast"},
    {"id": 2, "polorId": 1, "date": date(2023, 6, 1), "time": time(13, 30), "meal": "Lunch"},
    {"id": 3, "polorId": 1, "date": date(2023, 6, 2), "time": time(18, 45), "meal": "Dinner"},
    {"id": 4, "polorId": 2, "date": date(2023, 6, 2), "time": time(9, 15), "meal": "Breakfast"}
]

@router.get("/meals/{polorId}", response_model=List[schema.Meal])
async def get_meals(polorId: int, date: str = Query(...)):
    try:
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        filtered_data = [item for item in meal_data if item["polorId"] == polorId and item["date"] == requested_date]
        return filtered_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/meals", response_model=schema.MealCreateResponse)
async def create_meal(meal: schema.MealCreate):
    try:
        meal_id = len(meal_data) + 1
        meal_data.append({"id": meal_id, **meal.dict()})
        return schema.MealCreateResponse(id=meal_id, **meal.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.delete("/meals/{id}")
async def delete_meal(id: int):
    try:
        for i, meal in enumerate(meal_data):
            if meal["id"] == id:
                del meal_data[i]
                return {"message": "Meal deleted successfully"}
        raise HTTPException(status_code=404, detail="Meal not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))