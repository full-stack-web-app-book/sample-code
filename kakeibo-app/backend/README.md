# シンプル家計簿 バックエンド

シンプル家計簿のバックエンドサーバーです。

## 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install
```

## OpenAPI 定義

API 仕様の詳細は [openapi.yaml](openapi.yaml) に定義します。

## モックサーバーの起動

OpenAPI 定義に基づいたモックサーバーを起動します。

```bash
# モックサーバーの起動
npm run mock
```

## API 開発サーバの起動

`backend/.env` ファイルを作成し以下を記載します。

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=kakeibo_db
DATABASE_USER=kakeibo_user
DATABASE_PASSWORD=kakeibo_password
```

下記コマンドで開発サーバーを起動します。

```bash
npm run dev
```
