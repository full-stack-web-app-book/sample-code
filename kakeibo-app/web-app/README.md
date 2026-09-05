# シンプル家計簿 フロントエンド

シンプル家計簿アプリのフロントエンドサーバーを [React](https://ja.react.dev/) と [Vite](https://ja.vite.dev/) で実装します。

## 開発環境のセットアップ

環境変数定義ファイルを作成する。

`.env.local`

```
VITE_API_BASE_URL=http://localhost:5174
```

```bash
# 依存パッケージのインストール
npm install

# 開発モードで Web サーバーを起動
npm run dev
```

## ディレクトリ構成

```shell
src
├── App.tsx
├── components # React コンポーネント
│   ├── BalanceSummary.tsx
│   ├── Header.tsx
│   ├── InputButton.tsx
│   ├── SummaryCard.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── ui # Chakra UI CLI が生成するスニペット
├── hooks # カスタムフック
│   ├── transactions.ts
│   ├── useAddTransactions.ts
│   ├── useExpenseTransactions.ts
│   ├── useFinancialSummary.ts
│   └── useIncomeTransactions.ts
├── main.tsx
├── pages # ページごとのルートコンポーネント
│   ├── Home.tsx
│   └── Input.tsx
├── styles # CSS ファイル
│   └── global.css
└── utils # その他
    ├── date.ts
    └── formatter.ts
```
