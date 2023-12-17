from ultralytics import YOLO
import torch


def run_yolov8_on_video(video_path):
    # YOLOv8の初期化
    model = YOLO(model="./best.pt")

    result = model.predict(
        video_path,
        name="polars",
        save_txt=True,
        save_conf=True,
        save_dir="./",
        save_crop=True,
        exist_ok=True,
    )

    return result
