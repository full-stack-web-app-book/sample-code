# 書籍「つくりながら理解する Webアプリ開発入門」 サンプルコード集

<img src="book-cover.jpg" alt="書影：つくりながら理解する Webアプリ開発入門" width="240">

| | |
| --- | --- |
| 書名 | つくりながら理解する Webアプリ開発入門 |
| 著者 | 大岩 潤矢、高崎 和成 |
| 出版社 | SB クリエイティブ |
| 発売日 | 2026 年 9 月 19 日 |
| ISBN | 978-4-8156-3661-6 |
| 書籍ページ | https://www.sbcr.jp/product/4815636616/ |

本リポジトリは、上記書籍の本文中で作成するサンプルコードを章ごとにまとめたものです。
写経の答え合わせや、途中の章から読み始めるときの出発点として利用してください。

## ディレクトリ構成

```
.
├── ch3-kakeibo-app-ai/       3 章: AI に生成させる家計簿アプリのモック（HTML / CSS / JavaScript）
├── ch6-nodejs-typescript/    6 章: Node.js と TypeScript の入門サンプル
│   ├── nodejs-sample-app/      Node.js の基本と非同期処理
│   ├── qr-code-generator-js/   JavaScript 版 QR コード生成 CLI
│   ├── qr-code-generator-ts/   TypeScript 版 QR コード生成 CLI
│   └── typescript-sample/      TypeScript の基本
├── ch7-react/                7 章: React でフロントエンドをつくる
│   ├── counter-app/            素の JavaScript 版と React 版のカウンター
│   └── web-app/                家計簿アプリのフロントエンド（API 連携なし）
├── ch8-backend/              8 章: Hono でバックエンド API をつくる
│   ├── backend/                API サーバー（OpenAPI 定義・モックサーバー付き）
│   └── web-app/                API を呼び出すようにしたフロントエンド
├── ch9-database/             9 章: PostgreSQL につなぐ
│   ├── backend/                DB からデータを読み書きする API サーバー
│   └── web-app/                フロントエンド
├── ch10-deploy/              10 章: デプロイ
│   ├── backend/                デプロイ用に調整した API サーバー
│   ├── web-app/                デプロイ用に調整したフロントエンド
│   └── ddl.sql                 本番用テーブル定義
└── kakeibo-app/              完成版の家計簿アプリ（7〜10 章の到達点）
    ├── backend/                API サーバー（Hono + PostgreSQL）
    ├── web-app/                フロントエンド（React + Chakra UI）
    ├── database/ddl.sql        テーブル定義と初期データ
    └── compose.yaml            PostgreSQL を起動する Docker Compose 定義
```

サンプルコードがある章のみディレクトリを用意しています。1・2・4・5 章にコードはありません。

## このリポジトリの使い方

### 章ディレクトリの読み方

`ch7-react/web-app` → `ch8-backend/web-app` → `ch9-database/web-app` → `ch10-deploy/web-app` は、
**同じ家計簿アプリを章ごとに育てていったスナップショット**です。
章が進むごとに API 連携（`hooks/`）、環境変数（`.env.example`）、デプロイ設定が足されていきます。
バックエンドも同様に `ch8-backend/backend` → `ch9-database/backend` → `ch10-deploy/backend` と続きます。

`kakeibo-app/` はそこにデザイン（Chakra UI）・収支サマリー・グラフなどを加えた完成版です。
書籍を読み終えたあとの姿を確認したいときや、動くアプリをまず触ってみたいときはここから見てください。

### 共通の動かし方

各アプリは独立した npm プロジェクトです。目的のディレクトリに移動して、次のように実行します。

```bash
npm install
npm run dev
```

ただし一部のサンプルは例外です。

- `ch3-kakeibo-app-ai` は静的ファイルのみなので、`index.html` をブラウザで開くだけで動作します。
- `ch6-nodejs-typescript/nodejs-sample-app` は npm パッケージを使わないため、`node index.js` のように直接実行します。
- `ch6-nodejs-typescript/qr-code-generator-js` は `npm install` のあと `npm start`、`qr-code-generator-ts` は `npm run build` のあと `npm start` で実行します。

環境変数が必要なディレクトリには `.env.example` を置いています。`.env`（フロントエンドは `.env.local`）にコピーして値を設定してください。
各ディレクトリの README により詳しい手順があります。

### 完成版アプリ（kakeibo-app）を動かす

npm workspaces 構成なので、依存パッケージはリポジトリ内の `kakeibo-app/` でまとめてインストールします。

```bash
cd kakeibo-app
npm install
```

データベース（PostgreSQL）を Docker Compose で起動します。`database/ddl.sql` が初期化時に実行されます。

```bash
docker compose up -d
```

`kakeibo-app/backend/.env` を作成します。

```
DATABASE_HOST=localhost
DATABASE_PORT=15432
DATABASE_NAME=kakeibo_db
DATABASE_USER=kakeibo_user
DATABASE_PASSWORD=kakeibo_password
FRONTEND_URL=http://localhost:5173
```

`kakeibo-app/web-app/.env.local` を作成します。

```
VITE_API_BASE_URL=http://localhost:5174
```

バックエンドとフロントエンドをそれぞれ起動します。

```bash
# バックエンド（http://localhost:5174）
npm run dev --workspace backend

# フロントエンド（http://localhost:5173）
npm run dev --workspace web-app
```

ブラウザで http://localhost:5173 を開くと家計簿アプリが表示されます。

## 正誤表・お問い合わせ

書籍の正誤情報やサポート情報は[書籍ページ](https://www.sbcr.jp/product/4815636616/)を参照してください。
サンプルコードに関する不具合や気づいた点は、本リポジトリの Issue でお知らせください。
