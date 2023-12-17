import os

x_range = [10]
y_range = range(3194)

result = []

for x in x_range:
    for y in y_range:
        file_path = f"./runs/detect/polars3/labels/91_2020_09_26_{x}_{y}.txt"
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
                        f"./runs/detect/polars3/labels/91_2020_09_26_{x}_{y+i}.txt"
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

                result.append((x, y, center, speed))
        else:
            result.append((x, y, (0, 0), 0))

with open("./speed/output.txt", "w") as f:
    for x, y, center, speed in result:
        f.write(f"{x} {y} {center[0]} {center[1]} {speed}\n")
