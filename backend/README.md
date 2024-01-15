## 環境準備

### Requirement

- docker-compose

### 初回起動

- コンテナの作成

```sh
# コンテナを作成
$ docker-compose build
```

- poetry の定義ファイルについての install

```sh
$ docker-compose run --entrypoint "poetry install --no-root" backend
```

- sqlalchemy の install
  docker-compose が立ち上がっている状態で

```sh
$ docker-compose exec app poetry add sqlalchemy aiomysql
```

#### Docker 起動

```sh
# コンテナを作成、起動
$ docker-compose up -d --build
```

#### APIDocs

http://localhost:8000/docs

#### migrate

```sh
$ docker-compose exec backend poetry run python -m api.migrate_db
```

#### db クライアントの立ち上げ

```sh
$ docker-compose exec db mysql polar
```

## 新しい Python パッケージを追加した場合

```sh
$ docker-compose build --no-cache
```

## コンテナに入る
```sh
$ docker exec -it polar-detection-backend-1 /bin/bash
```