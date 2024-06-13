# ファイルからデータを読み込む関数
def read_data_from_file(filename):
    with open(filename, "r") as file:
        return [int(line.strip()) for line in file]


# 正解率を計算する関数
def calculate_accuracy(truth, predictions):
    if len(truth) != len(predictions):
        raise ValueError("The length of truth and predictions must be the same.")

    correct = sum(t == p for t, p in zip(truth, predictions))
    return correct / len(truth)


def calculate_accuracy_1(truth, predictions):
    if len(truth) != len(predictions):
        raise ValueError("The length of truth and predictions must be the same.")

    indexes_of_truth_one = [i for i, t in enumerate(truth) if t == 1]
    print(f"indexes_of_truth_one: {indexes_of_truth_one}")

    # truthが1の場合のpredictionsの正答数を計算
    correct_predictions_for_truth_one = sum(
        predictions[i] == 1 for i in indexes_of_truth_one
    )

    # 正答率を計算（分母が0になる場合は0を返す）
    accuracy_for_truth_one = (
        (correct_predictions_for_truth_one / len(indexes_of_truth_one))
        if indexes_of_truth_one
        else 0
    )

    return accuracy_for_truth_one


if __name__ == "__main__":
    # 正解率を計算して出力
    # 正解データと予測データを読み込む
    predictions = read_data_from_file("./predict_oneday_avg.txt")
    truth = read_data_from_file("./ground_trurh.txt")

    # truthの長さを揃える
    truth = truth[: len(predictions)]
    print(f"truth: {len(truth)}")
    print(f"predictions: {len(predictions)}")
    accuracy = calculate_accuracy_1(truth, predictions)
    print(f"Accuracy: {accuracy * 100:.2f}%")
