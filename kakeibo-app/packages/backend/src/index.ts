import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Client } from 'pg'

// PostgreSQLクライアントの初期化
const client = new Client({
  host: "localhost",
  port: 5432,
  database: "kakeibo_db",
  user: "kakeibo_user",
  password: "kakeibo_password"
})

// データベース接続
await client.connect()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// GET /summary - 財務サマリーの取得
app.get('/summary', async (c) => {
  try {
    // 収入合計を取得
    const incomeResult = await client.query(
      `SELECT SUM(amount) as total FROM transactions WHERE type = 'income'`
    )
    const totalIncome = parseFloat(incomeResult.rows[0].total)

    // 支出合計を取得
    const expenseResult = await client.query(
      `SELECT SUM(amount) as total FROM transactions WHERE type = 'expense'`
    )
    const totalExpense = parseFloat(expenseResult.rows[0].total)

    // 残高を計算
    const balance = totalIncome - totalExpense

    const financialSummary = {
      totalIncome,
      totalExpense,
      balance
    }

    return c.json(financialSummary, 200)
  } catch (error) {
    console.error('Database error:', error)
    return c.json({ message: 'サーバーエラーが発生しました' }, 500)
  }
})

// GET /transactions/income - 収入履歴一覧の取得
app.get('/transactions/income', async (c) => {
  try {
    // 収入履歴を取得
    const result = await client.query(
      `SELECT id, type, item, amount, date FROM transactions WHERE type = 'income' ORDER BY date DESC`
    )
    
    const transactions = result.rows.map(row => ({
      id: parseInt(row.id),
      type: row.type,
      item: row.item,
      amount: parseFloat(row.amount),
      date: new Date(row.date).toISOString().split('T')[0]
    }))

    // 合計金額を計算
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)

    // OpenAPI定義に従ったレスポンス形式
    const transactionList = {
      transactions,
      totalCount: transactions.length,
      totalAmount
    }

    return c.json(transactionList, 200)
  } catch (error) {
    console.error('Database error:', error)
    return c.json({ message: 'サーバーエラーが発生しました' }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 3001
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
