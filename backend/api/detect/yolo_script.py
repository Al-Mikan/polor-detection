from ultralytics import YOLO
import torch
import os
import cv2
import psutil
import threading
import time


def monitor_cpu(initial_time, event):
    print("START monitor_cpu")
    while not event.wait(0.1):
        elapsed_time = time.time() - initial_time
        cpu_percent = psutil.cpu_percent(percpu=True)
        mem = psutil.virtual_memory()

        cpu_percent = "\t".join(["{:10.4f}".format(v) for v in cpu_percent])
        print("time:", int(elapsed_time))
        print("cpu: ", cpu_percent)
        print("memory: ", mem.percent)
    print("END monitor_cpu")


async def run_yolov8_on_video(video_path):
    event = threading.Event()
    initial_time = time.time()
    m = threading.Thread(target=monitor_cpu, args=((initial_time, event)))
    m.start()  # 開始
    try:
        print("start run_yolov8_on_video !")
        # YOLOv8の初期化
        root = os.path.abspath(os.curdir)
        model_path = os.path.join(root, "best.pt")
        print(model_path)
        model = YOLO(model=model_path)

        cpu_percent = psutil.cpu_percent(percpu=True)
        mem = psutil.virtual_memory()

        result = model.predict(
            video_path,
            name="polars",
            save=True,
            save_txt=True,
            save_conf=True,
            save_dir="./api/detect",
            exist_ok=True,
            stream=False,
        )

        event.set()  # 終了
    except Exception as e:
        print(f"run_yolov8_on_videoでエラー発生: {e}")
        return None
