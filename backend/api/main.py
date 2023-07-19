from fastapi import FastAPI

from api.routers import detect_time, meal, polor, temperature,enrichment,event

app = FastAPI()
app.include_router(polor.router)
app.include_router(detect_time.router)
app.include_router(meal.router)
app.include_router(temperature.router)
app.include_router(enrichment.router)
app.include_router(event.router)
