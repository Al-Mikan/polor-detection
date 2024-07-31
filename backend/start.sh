#!/bin/sh
# exec.py を実行
poetry run python /src/detect/exec.py
# Uvicornサーバーを起動
exec poetry run uvicorn api.main:app --host 0.0.0.0 --reload
