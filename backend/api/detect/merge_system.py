import asyncio
from yolo_script import run_yolov8_on_video
from classification.classification_model import classification

if __name__ == "__main__":
    # 非同期イベントループを使用して関数を実行
    video_path = "../media/videos/91_2020_09_28_18.mp4"
    asyncio.run(run_yolov8_on_video(video_path))
    classification("91_2020_09_28_18.mp4")
