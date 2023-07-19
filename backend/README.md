## 環境準備

### Requirement

- docker-compose

#### Docker 起動

```sh
# コンテナを作成、起動
$ docker-compose up -d --build
```

#### APIDocs

http://localhost:8000/docs

#### migrate

```sh
$ docker-compose exec app poetry run python -m api.migrate_db
```

#### db クライアントの立ち上げ

```sh
$ docker-compose exec db mysql polor
```
