# QRコード生成ツール

このツールは、URLを入力として受け取り、ターミナルにQRコードを生成・表示するNode.jsアプリケーションです。

## 機能

- URLからQRコードを生成
- ターミナルにASCII文字でQRコードを表示
- URLの形式検証
- エラーハンドリング

## 必要な環境

- Node.js (v12以上推奨)
- npm

## インストール

```bash
# 依存関係のインストール
npm install
```

## 使用方法

### 基本的な使用方法

```bash
node index.js <URL>
```

### 例

```bash
# Googleのサイト
node index.js https://www.google.com

# GitHubのサイト
node index.js https://github.com

# npmを使用して実行
npm start https://www.example.com
```

### 直接実行

ファイルが実行可能な場合：

```bash
./index.js https://www.example.com
```

## 出力例

```
QRコードを生成中: https://www.google.com

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▄▄██████▄█ ▄▄▄▄▄ █
█ █   █ █ ▀█ ▄ ▄███ █   █ █
█ █▄▄▄█ █▄ ▄▄▀▄ ▄▄█ █▄▄▄█ █
... (QRコード) ...

QRコードが生成されました！
URL: https://www.google.com
```

## エラーハンドリング

- URLが指定されていない場合、使用方法を表示します
- 無効なURL形式の場合、エラーメッセージを表示します

## 依存関係

- `qrcode-terminal`: ターミナルでQRコードを表示するためのパッケージ

## ライセンス

ISC
