# python3.9のイメージをダウンロード
FROM python:3.9-buster
ENV PYTHONUNBUFFERED=1

RUN apt-get clean && \
    apt-get -y update && \
    apt-get install -y wget build-essential libgl1-mesa-dev

WORKDIR /src

RUN pip install --upgrade pip
# pipを使ってpoetryをインストール
RUN pip install poetry

# poetryの定義ファイルをコピー (存在する場合)
COPY ["./backend/pyproject.toml", "./backend/poetry.lock", "/src/"]
# COPY pyproject.toml poetry.lock ./

# poetryでライブラリをインストール (pyproject.tomlが既にある場合)
RUN poetry config virtualenvs.in-project false
RUN poetry install --no-root

RUN pip install --upgrade ultralytics


# uvicornのサーバーを立ち上げる
ENTRYPOINT ["poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]