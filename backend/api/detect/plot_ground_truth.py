import cv2
import os
import numpy as np
import zlib
import matplotlib.pyplot as plt
import random
import seaborn as sns
import plotly.express as px
import matplotlib as mpl

# 原始のデータを読み込んで、新しいファイを作る
new_dataset1_path = os.path.join(os.path.dirname("/home/wang/05_06/labels.txt"), "/home/wang/05_06/labels.txt")
new_dataset2_path = os.path.join(os.path.dirname("/home/wang/yolov5_supporter/1212_oneday_txt/ser_o_500_06.txt"), "new_dataset2.txt")


def read_data_from_file(file_path):
    with open(file_path, 'r') as f:
        return [int(line.strip()) for line in f.readlines()]

def plot_data(dataset1, dataset2, colors):
    fig, ax = plt.subplots(figsize=(20, 10))
    
    for i, data in enumerate(zip(dataset1, dataset2)):
        pred, true = data
        ax.scatter(i, 1, c=colors[pred], marker='o', label=f"Pred: {pred}" if i == 0 else None)
        ax.scatter(i, 0, c=colors[true], marker='s', label=f"True: {true}" if i == 0 else None)

    ax.set_yticks([0, 1])
    ax.set_yticklabels(["True", "Predicted"])
    ax.legend()
    plt.show()

ser_list = read_data_from_file(new_dataset1_path)
ser_o_list = read_data_from_file(new_dataset2_path)

vegetables = ["truth", "prediction"]
time = ["6", "8", "10", "12", "14", "16", "18", "20"]


harvest = np.array([ser_list[:47300], ser_o_list[:47300]])
fig, ax = plt.subplots(figsize=(12, 6))
im = ax.imshow(harvest, interpolation='nearest', origin='lower', cmap='coolwarm')
ax.set_aspect(len(ser_list) / 6)

ax.set_yticks(np.arange(len(vegetables)), labels=vegetables, fontsize=18)
ax.set_xticks(47300 / 15 + np.arange(len(time)) * (47300 / 15 * 2), labels=time, fontsize=18)
plt.xlabel('hour', fontsize=18)
plt.show()