from fastapi import FastAPI

from api.routers import detect_time, meal, polor, temperature,enrichment,event,detection_polor
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001","http://localhost:3000"],  # 許可するオリジンを指定
    allow_credentials=True,  # クレデンシャル（Cookieなど）の送信を許可
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # 許可するHTTPメソッドを指定
    allow_headers=["*"], 
)

app.include_router(polor.router)
app.include_router(detect_time.router)
app.include_router(detection_polor.router)
app.include_router(meal.router)
app.include_router(temperature.router)
app.include_router(enrichment.router)
app.include_router(event.router)

