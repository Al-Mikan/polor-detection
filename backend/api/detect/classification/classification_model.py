import torch
import numpy as np
import matplotlib.pyplot as plt
import os
import cv2
from PIL import Image
from model import Model


SIZE = 62
BORDER_SIZE = 2


def video_to_image(video_path, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error opening video file.")
        exit()
    frame_count = 1
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_name = f"{frame_count}.jpg"
        frame_path = os.path.join(output_dir, frame_name)
        cv2.imwrite(frame_path, frame)
        frame_count += 1

    cap.release()
    cv2.destroyAllWindows()

    return frame_count - 1


def merge_all_files_in_directory(directory, output_file, count=3194):
    with open(output_file, "w") as merged_file:
        for i in range(1, count + 1):
            file_path = os.path.join(directory, f"91_2020_09_26_10_{i}.txt")
            if os.path.exists(file_path):
                with open(file_path, "r") as file:
                    content = file.readline().rstrip("\n")
                    if content == "":
                        content = "0 0 0 0 0 0"
                    merged_file.write(content)
            else:
                merged_file.write("0 0 0 0 0 0")
            merged_file.write("\n")
    print(f"Merged files in {directory} into {output_file}")
    return count


def read_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return img


##「物体の種類」「中心のX座標」「中心のY座標」「幅」「高さ」


def clip_image():
    if not os.path.exists("./images"):
        os.makedirs("./images")
    file_path = os.path.join("./labels.txt")
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            lines = f.readlines()  # ファイル全体の行を読み取る
            for index, line in enumerate(lines, start=1):
                _, x_ratio, y_ratio, *_ = [float(num) for num in line.split()]
                print(index, x_ratio, y_ratio)
                img_path = os.path.join("./frames/", f"{index}.jpg")
                if os.path.exists(img_path):
                    # 検知されていない場合
                    if x_ratio == 0 and y_ratio == 0:
                        new_img = Image.new(
                            "RGB",
                            (SIZE + BORDER_SIZE * 2, SIZE + BORDER_SIZE * 2),
                            (0, 0, 0),
                        )
                        new_img_path = os.path.join("./images/", f"{index}.jpg")
                        new_img.save(new_img_path)
                    else:
                        with Image.open(img_path) as img:
                            img_width, img_height = img.size
                            x = int(x_ratio * img_width)
                            y = int(y_ratio * img_height)
                            left = max(0, x - SIZE // 2)
                            top = max(0, y - SIZE // 2)
                            right = min(img_width, x + SIZE // 2)
                            bottom = min(img_height, y + SIZE // 2)
                            crop_area = (left, top, right, bottom)
                            crop_img = img.crop(crop_area)
                            new_width, new_height = (
                                SIZE + BORDER_SIZE * 2,
                                SIZE + BORDER_SIZE * 2,
                            )
                            new_img = Image.new(
                                "RGB", (new_width, new_height), (0, 0, 0)
                            )
                            paste_area = (BORDER_SIZE, BORDER_SIZE)
                            new_img.paste(crop_img.resize((SIZE, SIZE)), paste_area)
                            new_img_path = os.path.join("./images/", f"{index}.jpg")
                            new_img.save(new_img_path)
                else:
                    new_img = Image.new(
                        "RGB",
                        (SIZE + BORDER_SIZE * 2, SIZE + BORDER_SIZE * 2),
                        (0, 0, 0),
                    )
                    new_img_path = os.path.join("./images/", f"{index}.jpg")
                    new_img.save(new_img_path)


def calc_speed(frames=3194, video_name="91_2020_09_26_10"):
    result = []
    x = video_name.split("_")[-1]

    for frame in range(1, frames + 1):
        file_path = f"../runs/detect/polars/labels/{video_name}_{frame}.txt"
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                data = f.readline().split()
                center = (int(float(data[1]) * 36), int(float(data[2]) * 36))
                speed = 0.0
                count = 0
                for i in range(-15, 16):
                    if i == 0:
                        continue
                    neighbor_file_path = (
                        f"../runs/detect/polars/labels/{video_name}_{frame+i}.txt"
                    )
                    if os.path.exists(neighbor_file_path):
                        with open(neighbor_file_path, "r") as nf:
                            neighbor_data = nf.readline().split()
                            neighbor_center = (
                                int(float(neighbor_data[1]) * 36),
                                int(float(neighbor_data[2]) * 36),
                            )
                            speed += abs(neighbor_center[1] - center[1])
                            count += 1
                if count > 0:
                    speed /= count
                result.append((x, frame, center, speed))
        else:
            result.append((x, frame, (0, 0), 0))

    with open("./speed.txt", "w") as f:
        for x, y, center, speed in result:
            f.write(f"{x} {y} {center[0]} {center[1]} {speed}\n")


def MakeDataset(n_data, n_class, h_size=256, w_size=256):
    input_file = open("./speed.txt", "r")
    input_data = input_file.read()
    input_lines = input_data.split("\n")
    input_lines = input_lines[:-1]
    input_data = []
    for line in input_lines:
        tmp = line.split(" ")
        input_data.append(
            (int(tmp[0]), int(tmp[1]), int(tmp[2]), int(tmp[3]), float(tmp[4]))
        )

    label_file = open("labels.txt", "r")
    label_data = label_file.read()
    label_lines = label_data.split("\n")
    label_lines = label_lines[:-1]
    label_data = []
    for i in range(n_data):
        elements = label_lines[i].split(" ")
        converted_elements = [float(element) for element in elements]
        label_data.append(converted_elements)

    image_datas = []
    coordinates_data = []
    speed_data = []
    for i in range(n_data):
        image_path = "./images/{}.jpg".format(str(input_data[i][1]))
        image_datas.append(read_image(image_path))
        coordinates_data.append([input_data[i][2], input_data[i][3]])
        speed_data.append(input_data[i][4])

    image_datas = np.array(image_datas)
    image_datas = np.transpose(image_datas, (0, 3, 1, 2))
    image_datas = torch.tensor(image_datas).float()
    coordinates_data = torch.tensor(coordinates_data).float()
    speed_data = torch.tensor(speed_data).float().unsqueeze(-1)

    labels = torch.tensor(label_data).long()
    ret_data = {"data": (image_datas, coordinates_data, speed_data), "label": labels}
    return ret_data


def main(video_name):
    frame_count = video_to_image("../../media/videos/91_2020_09_26_10.mp4", "frames/")
    merge_all_files_in_directory(
        "../runs/detect/polars/labels", "labels.txt", frame_count
    )
    clip_image()
    calc_speed(frame_count, video_name)

    image_data, coordinates_data, speed_data = MakeDataset(frame_count, 8)["data"]

    print(image_data.size())
    print(coordinates_data.size())
    print(speed_data.size())

    model = Model()
    model.load_state_dict(torch.load("./model-100epoch.pth"))
    model.eval()

    predict = model(coordinates_data, speed_data, image_data)
    print(predict.size())

    output_file_path = "predict_output.txt"

    # predictの内容をテキストファイルに書き込む
    with open(output_file_path, "w") as output_file:
        predicted_classes = torch.argmax(predict, dim=1)
        predicted_classes = predicted_classes.tolist()  # リストに変換
        for item in predicted_classes:
            output_file.write(str(item) + "\n")

    # 0:いない 1:常同　2:泳ぐ 3:歩く 4:食べる 5:休む 6:座る


if __name__ == "__main__":
    main("91_2020_09_26_10")
