from ultralytics import YOLO
import torch
import os


async def run_yolov8_on_video(video_path):
    print("start run_yolov8_on_video !")
    # YOLOv8の初期化
    root = os.path.abspath(os.curdir)
    model_path = os.path.join(root, "best.pt")
    print(model_path)
    model = YOLO(model=model_path)

    result = model.predict(
        video_path,
        name="polars",
        save_txt=True,
        save_conf=True,
        save_dir="./api/detect",
        save_crop=True,
        exist_ok=True,
    )

    return result
