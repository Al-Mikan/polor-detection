from fastapi import FastAPI

from api.routers import (
    meal,
    polar,
    temperature,
    enrichment,
    event,
    polar_cage_log,
    cage,
    polar_cage_log,
    excretion,
    expropriation,
    memo,
    pool_cleaning,
    training,
    wakeup_time,
    water,
    video,
    classification,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(docs_url="/api/docs", redoc_url=None, openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],  # 許可するオリジンを指定
    allow_credentials=True,  # クレデンシャル（Cookieなど）の送信を許可
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # 許可するHTTPメソッドを指定
    allow_headers=["*"],
)

app.include_router(polar.router)
app.include_router(cage.router)
app.include_router(polar_cage_log.router)
app.include_router(classification.router)
app.include_router(meal.router)
app.include_router(temperature.router)
app.include_router(enrichment.router)
app.include_router(event.router)
app.include_router(excretion.router)
app.include_router(expropriation.router)
app.include_router(memo.router)
app.include_router(pool_cleaning.router)
app.include_router(training.router)
app.include_router(wakeup_time.router)
app.include_router(water.router)
app.include_router(video.router)
