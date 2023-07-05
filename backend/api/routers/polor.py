from fastapi import APIRouter
from typing import List

router = APIRouter()

import api.schemas.polor as schema

polors_data = [
    {"id": 1, "name": "Polor1"},
    {"id": 2, "name": "Polor2"},
    {"id": 3, "name": "Polor3"}
]

@router.get("/polors" , response_model=List[schema.Polor])
async def polors():
    return polors_data