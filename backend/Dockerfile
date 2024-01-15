# python3.9のイメージをダウンロード
FROM python:3.9-buster
ENV PYTHONUNBUFFERED=1

ENV POETRY_HOME="/opt/poetry"
ENV PATH="$PATH:$POETRY_HOME/bin"

RUN apt-get clean && \
    apt-get -y update && \
    apt-get install -y wget build-essential libgl1-mesa-dev

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

# uvicornのサーバーを立ち上げる
ENTRYPOINT ["poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--reload"]