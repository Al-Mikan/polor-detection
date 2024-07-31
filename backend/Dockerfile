# python3.9のイメージをダウンロード
FROM python:3.9-buster
ENV PYTHONUNBUFFERED=1

ENV POETRY_HOME="/opt/poetry"
ENV PATH="$PATH:$POETRY_HOME/bin"

RUN apt-get clean && \
    apt-get -y update && \
    apt-get install -y wget build-essential libgl1-mesa-dev

# YoloV5のリポジトリをクローン
RUN git clone https://github.com/ultralytics/yolov5.git /yolov5
WORKDIR /yolov5

# YoloV5の依存関係のインストール
RUN pip install -r requirements.txt


WORKDIR /src

RUN pip install --upgrade pip
# pipを使ってpoetryをインストール
RUN pip install poetry

# poetryの定義ファイルをコピー (存在する場合)
COPY ["./backend/pyproject.toml", "./backend/poetry.lock", "/src/"]

# poetryでライブラリをインストール (pyproject.tomlが既にある場合)
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-root

ENV PYTHONPATH="/src/.venv/lib/python3.9/site-packages:$PYTHONPATH"

# スクリプトと起動シェルのコピー
COPY ./backend/detect/exec.py /src/detect/exec.py
COPY ./backend/start.sh /src/start.sh
RUN chmod +x /src/start.sh
RUN chmod +x /src/detect/exec.py

# スクリプトの実行設定
ENTRYPOINT ["/src/start.sh"]