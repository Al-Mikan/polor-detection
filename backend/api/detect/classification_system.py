import asyncio
import torch
import sys
import datetime
import time
import psutil
import threading
import time
import os

sys.path.append("../../")

# from yolo_script import run_yolov8_on_video
from classification.classification_model import (
    video_to_image,
    merge_all_files_in_directory,
    clip_image,
    calc_speed,
    MakeDataset,
)
from api.detect.classification.model import Model
from api.models.model import Classification

from api.db import get_db
import api.schemas.classification as schema
from api.detect.yolo_script import run_yolov8_on_video

RESULT_YOLO_DIR = "./runs/detect/polars/labels"
FRAME_DIR = "./frames/"
CROP_IMAGE_DIR = "./images/"


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


def classification(video_path):
    event = threading.Event()
    initial_time = time.time()
    m = threading.Thread(target=monitor_cpu, args=((initial_time, event)))
    # m.start()  # 開始
    try:
        print("#########################video_to_image")
        frame_count = video_to_image(video_path, FRAME_DIR)

    except Exception as e:
        print(f"video_to_imageでエラー発生: {e}")
        return

    try:
        print("#########################merge_all_files_in_directory")
        merge_all_files_in_directory(
            RESULT_YOLO_DIR, "./labels.txt", frame_count, video_path
        )
    except Exception as e:
        print(f"merge_all_files_in_directoryでエラー発生: {e}")
        return

    try:
        print("############################clip_image")
        clip_image(frame_path=FRAME_DIR, image_path=CROP_IMAGE_DIR)
    except Exception as e:
        print(f"clip_imageでエラー発生: {e}")
        return

    try:
        print("#############################calc_speed")
        calc_speed(frame_count, video_path, RESULT_YOLO_DIR)
    except Exception as e:
        print(f"calc_speedでエラー発生: {e}")
        return

    try:
        print("#############################MakeDataset")
        image_data, coordinates_data, speed_data = MakeDataset(3199, 8)["data"]
    except Exception as e:
        print(f"MakeDatasetでエラー発生: {e}")
        return

    try:
        print("#############################model")
        model = Model()
        model.load_state_dict(torch.load("./classification/model-100epoch.pth"))
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

    output_file_path = "./predict_output.txt"

    try:
        with open(output_file_path, "w") as output_file:
            predicted_classes = torch.argmax(predict, dim=1)
            predicted_classes = predicted_classes.tolist()  # リストに変換
            for item in predicted_classes:
                output_file.write(str(item) + "\n")
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
    # event.set()  # 終了


async def insert_classification(classifications: [schema.ClassificationCreate]):
    async for session in get_db():
        async with session.begin():
            inserted_classifications = []  # 挿入された分類を保存するリスト
            for classification in classifications:
                new_classification = Classification(
                    date=classification.date,
                    startTime=classification.startTime,
                    endTime=classification.endTime,
                    classification=classification.classification,
                    cageId=classification.cageId,
                    createdAt=datetime.datetime.now(),
                    updatedAt=datetime.datetime.now(),
                )
                session.add(new_classification)
                inserted_classifications.append(new_classification)  # リストに追加

            await session.commit()  # 非同期コミットを待機
            return inserted_classifications


if __name__ == "__main__":
    # 引数で動画のパスを指定
    classification_start_time = time.time()
    # 0:いない 1:常同　2:泳ぐ 3:歩く 4:食べる 5:休む 6:座る
    video_path = "../media/videos/91_2020_09_22_14.mp4"

    for item in os.listdir(RESULT_YOLO_DIR):
        item_path = os.path.join(RESULT_YOLO_DIR, item)
        os.remove(item_path)

    asyncio.run(run_yolov8_on_video(video_path))

    classification(video_path=video_path)

    # 結果をDBに保存
    video_name = video_path.split("/")[-1].split(".")[0]
    year = video_name.split("_")[1]
    month = video_name.split("_")[2]
    day = video_name.split("_")[3]
    hour = video_name.split("_")[4]
    date = f"{year}-{month}-{day}"

    # predict_output.txtの内容を一行ずつ読み込んでリストに格納

    try:
        # ファイル読み込み
        with open("./predict_output.txt", "r") as f:
            classification_list = [int(line.strip()) for line in f.readlines()]

        start_time = None
        result_list = []
        for i, classification_per_second in enumerate(classification_list):
            minute = i // 60
            second = i % 60
            time_str = f"{hour}:{minute}:{second}"
            if start_time is None:
                start_time = time_str
            if i == 0:
                classification_num = classification_per_second
                continue
            if classification_per_second != classification_num:
                # 時刻の処理
                start_time_components = start_time.split(":")
                start_time = schema.time(
                    hour=int(start_time_components[0]),
                    minute=int(start_time_components[1]),
                    second=int(start_time_components[2]),
                )
                end_time_components = time_str.split(":")
                end_time = schema.time(
                    hour=int(end_time_components[0]),
                    minute=int(end_time_components[1]),
                    second=int(end_time_components[2]),
                )
                # データ作成
                el = schema.ClassificationCreate(
                    date=date,
                    startTime=start_time,
                    endTime=end_time,
                    classification=classification_num,
                    cageId=1,
                )
                result_list.append(el)
                start_time = time_str
                classification_num = classification_per_second

            end_time = time_str

        # データベースへの挿入
        # asyncio.run(insert_classification(result_list))

    except FileNotFoundError:
        print("ファイルが見つかりません: ./predict_output.txt")
    except ValueError as e:
        print(f"ファイルの内容が不正です: {e}")
    except Exception as e:
        print(f"予期せぬエラーが発生しました: {e}")

    classification_end_time = time.time()
    elapsed_time = classification_end_time - classification_start_time  # 経過時間
    print("#############################")
    print(classification_start_time)
    print(classification_end_time)
    print(f"処理にかかった時間: {elapsed_time}秒")
