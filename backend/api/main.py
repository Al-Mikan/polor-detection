
from fastapi import FastAPI

from api.routers import polor,detect_time,meal,temperature

app = FastAPI()
app.include_router(polor.router)
app.include_router(detect_time.router)
app.include_router(meal.router)
app.include_router(temperature.router)


