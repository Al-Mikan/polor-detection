def moving_average(data, window_size):
    result = []
    for i in range(len(data)):
        start = max(0, i - window_size)
        end = min(len(data), i + window_size + 1)
        window = data[start:end]
        majority_vote = max(set(window), key=window.count)
        result.append(majority_vote)
    return result


def main(input_file, output_file, window_size):
    with open(input_file, "r") as f:
        data = [int(line.strip()) for line in f.readlines()]

    smoothed_data = moving_average(data, window_size)

    with open(output_file, "w") as f:
        for value in smoothed_data:
            f.write(str(value) + "\n")


if __name__ == "__main__":
    input_file = "predict_oneday.txt"  # 入力ファイルのパス
    output_file = "predict_oneday_avg.txt"  # 出力ファイルのパス
    window_size = 10  # 移動平均の窓サイズ（前後50フレーム）
    main(input_file, output_file, window_size)
