# シンプル家計簿 バックエンド

OpenAPI 定義に基づいたモックサーバーを提供します。

## 開発環境のセットアップ

```bash
# 依存パッケージのインストール
npm install

# モックサーバーの起動
npm run start  # 通常モード
npm run dev    # 動的レスポンスモード（レスポンスがランダムに変化）
```

## エンドポイント

サーバー起動後、以下のエンドポイントが利用可能になります：

- `GET /api/summary` - 収入合計、支出合計、残高を取得

## OpenAPI 定義

API 仕様の詳細は [openapi.yaml](openapi.yaml) を参照してください。
