from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

import os
import torch
import sys
import time
import threading
import time
import psutil
from ultralytics import YOLO


sys.path.append("../../")

from detect.classification_func import (
    video_to_image,
    merge_all_files_in_directory,
    clip_image,
    calc_speed,
    MakeDataset,
)

from classification_model.model import Model

RESULT_YOLO_DIR = "./detect/runs/detect/polars/labels"
FRAME_DIR = "./detect/frames/"
CROP_IMAGE_DIR = "./detect/images/"
SPEED_FILE = "./detect/speed.txt"
LABEL_FILE = "./detect/labels.txt"
IMAGES_FOLDER = "./detect/images/"


def classification(video_path):
    # event = threading.Event()
    # initial_time = time.time()
    # m = threading.Thread(target=monitor_cpu, args=((initial_time, event)))
    # m.start()  # 開始
    try:
        print(f"Starting YOLO model on video: {video_path}")
        try:
            print("#########################video_to_image")
            frame_count = video_to_image(video_path, FRAME_DIR)

        except Exception as e:
            print(f"video_to_imageでエラー発生: {e}")
            return

        try:
            print("#########################merge_all_files_in_directory")
            merge_all_files_in_directory(
                RESULT_YOLO_DIR, LABEL_FILE, frame_count, video_path
            )
        except Exception as e:
            print(f"merge_all_files_in_directoryでエラー発生: {e}")
            return

        try:
            print("############################clip_image")
            clip_image(
                frame_path=FRAME_DIR, image_path=CROP_IMAGE_DIR, label_path=LABEL_FILE
            )
        except Exception as e:
            print(f"clip_imageでエラー発生: {e}")
            return

        try:
            print("#############################calc_speed")
            calc_speed(frame_count, video_path, RESULT_YOLO_DIR, SPEED_FILE)
        except Exception as e:
            print(f"calc_speedでエラー発生: {e}")
            return

        try:
            print("#############################MakeDataset")
            image_data, coordinates_data, speed_data = MakeDataset(
                frame_count, 8, SPEED_FILE, LABEL_FILE, IMAGES_FOLDER
            )["data"]
        except Exception as e:
            print(f"MakeDatasetでエラー発生: {e}")
            return

        try:
            print("#############################model")
            model = Model()
            model.load_state_dict(
                torch.load("./detect/classification_model/model-100epoch.pth")
            )
            model.eval()
        except Exception as e:
            print(f"モデルの読み込みまたは評価でエラー発生: {e}")
            return

        try:
            print("#############################predict")
            predict = model(coordinates_data, speed_data, image_data)
        except Exception as e:
            print(f"予測モデルでエラー発生: {e}")
            return

        filename_with_extension = os.path.basename(video_path)
        output_file_path = f"./detect/classification_results/{os.path.splitext(filename_with_extension)[0]}.txt"
        try:
            with open(output_file_path, "w") as output_file:
                predicted_classes = torch.argmax(predict, dim=1)
                predicted_classes = predicted_classes.tolist()  # リストに変換
                for item in predicted_classes:
                    output_file.write(str(item) + "\n")

            print(f"Finished classification: {video_path}")
        # output_file_path = "./predict_oneday.txt"

        # try:
        #     with open(output_file_path, "a") as output_file:
        #         predicted_classes = torch.argmax(predict, dim=1)
        #         predicted_classes = predicted_classes.tolist()  # リストに変換

        #         # リストの長さを3200に調整
        #         while len(predicted_classes) < 3200:
        #             predicted_classes.append(predicted_classes[-1])
        #         if len(predicted_classes) > 3200:
        #             predicted_classes = predicted_classes[:3200]

        #         for item in predicted_classes:
        #             output_file.write(str(item) + "\n")

        except Exception as e:
            print(f"ファイル書き込みでエラー発生: {e}")
            return

    except Exception as e:
        # エラーが発生した場合、エラーメッセージを出力
        print(f"Error running YOLO model on video {video_path}: {e}")


class MyHandler(FileSystemEventHandler):
    def on_created(self, event):
        if event.is_directory:
            print(f"New directory detected: {event.src_path}")
            return None
        elif event.src_path.endswith(".mp4"):
            print(f"New video file detected: {event.src_path}")
            # データベースにパスを保存
            add_path_to_db(event.src_path)
            # YOLOモデルを実行
            run_yolo_model(event.src_path)


def start_monitoring(path):
    while True:
        observer = Observer()
        event_handler = MyHandler()
        observer.schedule(event_handler, path, recursive=False)
        observer.start()
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            observer.stop()
            observer.join()
            print("Monitoring stopped by user.")
            break
        except Exception as e:
            observer.stop()
            observer.join()
            print(f"Error occurred: {e}. Restarting monitoring...")
            time.sleep(5)  # エラー後の少しの遅延を設ける


def list_mp4_files(directory):
    # 指定されたディレクトリにあるすべてのファイルを走査
    for filename in os.listdir(directory):
        if filename.endswith(".mp4"):
            # .mp4 ファイルが見つかった場合、ファイル名を出力
            print(filename)


def add_path_to_db(video_path):
    print("add path to db")
    pass


def run_yolo_model(video_path):
    # YOLOモデルを実行するコマンドをここに記述
    print("run yolo model")
    for item in os.listdir(RESULT_YOLO_DIR):
        item_path = os.path.join(RESULT_YOLO_DIR, item)
        os.remove(item_path)

    try:
        print("start run_yolov8_on_video !")
        # YOLOv8の初期化
        model_path = "./detect/yolo_model/best.pt"
        model = YOLO(model=model_path)

        result = model.predict(
            video_path,
            name="polars",
            save=True,
            save_txt=True,
            save_dir="./detect",
            exist_ok=True,
            stream=False,
            conf=0.30,
        )

    except Exception as e:
        print(f"run_yolov8_on_videoでエラー発生: {e}")
        return None

    classification(video_path=video_path)
    print("complete")


if __name__ == "__main__":
    path = "./media/videos/"  # 監視するディレクトリのパス
    print("start watching--------------------------------")

    list_mp4_files(path)

    # 監視ディレクトリが存在しない場合は作成
    if not os.path.exists(path):
        print("create directory")
        os.makedirs(path)

    start_monitoring(path)


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
