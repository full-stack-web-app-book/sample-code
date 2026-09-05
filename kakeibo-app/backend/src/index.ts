import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Client } from "pg";
import { env } from "./env.js";

// PostgreSQLクライアントの初期化
const client = new Client({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
});

// データベース接続
await client.connect();

const app = new Hono();

// CORS設定を適用
app.use(
  "*",
  cors({
    origin: [env.FRONTEND_URL],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// GET /summary - 家計簿サマリーの取得
app.get("/summary", async (c) => {
  try {
    // 収入合計を取得（正の値）
    const incomeResult = await client.query(
      `SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE amount > 0`
    );
    const totalIncome = parseFloat(incomeResult.rows[0].total);

    // 支出合計を取得（負の値の合計、結果は負の値）
    const expenseResult = await client.query(
      `SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE amount < 0`
    );
    const totalExpense = parseFloat(expenseResult.rows[0].total);

    // 残高を計算（収入 + 支出、支出は負の値なので実質的に引き算）
    const balance = totalIncome + totalExpense;

    const financialSummary = {
      totalIncome,
      totalExpense,
      balance,
    };

    return c.json(financialSummary, 200);
  } catch (error) {
    console.error("Database error:", error);
    return c.json({ message: "サーバーエラーが発生しました" }, 500);
  }
});

// GET /transactions - 取引履歴一覧の取得
app.get("/transactions", async (c) => {
  try {
    const type = c.req.query("type");

    let query = `SELECT id, item, amount, date FROM transactions`;
    let countQuery = `SELECT COUNT(*) as total FROM transactions`;
    let params: string[] = [];

    // typeクエリパラメータがある場合はフィルタリング
    if (type && (type === "income" || type === "expense")) {
      const addTypeQuery =
        type === "income" ? ` WHERE amount > 0` : ` WHERE amount < 0`;
      query += addTypeQuery;
      countQuery += addTypeQuery;
    }

    query += ` ORDER BY date DESC`;

    // 取引履歴を取得
    const result = await client.query(query, params);
    const countResult = await client.query(countQuery, params);

    const transactions = result.rows.map((row) => ({
      id: parseInt(row.id),
      item: row.item,
      amount: parseFloat(row.amount), // 実際の値（正負含む）を返す
      date: new Date(row.date).toISOString().split("T")[0],
    }));

    // 合計金額を計算
    const totalAmount = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const transactionList = {
      transactions,
      totalCount: parseInt(countResult.rows[0].total),
      totalAmount,
    };

    return c.json(transactionList, 200);
  } catch (error) {
    console.error("Database error:", error);
    return c.json({ message: "サーバーエラーが発生しました" }, 500);
  }
});

// POST /transactions - 取引情報の登録
app.post("/transactions", async (c) => {
  try {
    const body = await c.req.json();
    const { item, amount, date } = body;

    // バリデーション
    if (!item || amount === undefined || !date) {
      return c.json({ message: "必須項目が不足しています" }, 400);
    }

    if (typeof amount !== "number" || amount === 0) {
      return c.json({ message: "金額は0以外の数値である必要があります" }, 400);
    }

    // 日付の形式チェック
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return c.json({ message: "日付はYYYY-MM-DD形式で入力してください" }, 400);
    }

    // データベースに挿入
    const result = await client.query(
      `INSERT INTO transactions (item, amount, date) VALUES ($1, $2, $3) RETURNING id, item, amount, date`,
      [item, amount, date]
    );

    const newTransaction = {
      id: parseInt(result.rows[0].id),
      item: result.rows[0].item,
      amount: parseFloat(result.rows[0].amount),
      date: result.rows[0].date,
    };

    return c.json(newTransaction, 201);
  } catch (error) {
    console.error("Database error:", error);
    return c.json({ message: "サーバーエラーが発生しました" }, 500);
  }
});

serve(
  {
    fetch: app.fetch,
    port: 5174,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
