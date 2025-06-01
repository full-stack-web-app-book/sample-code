// filepath: /Users/kz-takasaki/work/github/web-app-study/kakeibo-app/packages/frontend/src/components/TransactionHistory.tsx
import React from "react";
import {
  type Transaction,
  formatDate,
  formatAmount,
} from "../utils/transactionUtils";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
}) => {
  // 収入と支出を分ける
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  return (
    <div className="history-container">
      <div className="history-section">
        <h2>収入履歴</h2>
        <div className="history-list">
          {incomeTransactions.length > 0 ? (
            incomeTransactions.map((transaction) => (
              <div className="history-item" key={transaction.id}>
                <div>
                  <div>{transaction.item}</div>
                  <div className="history-date">
                    {formatDate(transaction.date)}
                  </div>
                </div>
                <div className="income-amount">
                  {formatAmount(transaction.amount)}
                </div>
              </div>
            ))
          ) : (
            <p>収入の記録がありません</p>
          )}
        </div>
      </div>

      <div className="history-section">
        <h2>支出履歴</h2>
        <div className="history-list">
          {expenseTransactions.length > 0 ? (
            expenseTransactions.map((transaction) => (
              <div className="history-item" key={transaction.id}>
                <div>
                  <div>{transaction.item}</div>
                  <div className="history-date">
                    {formatDate(transaction.date)}
                  </div>
                </div>
                <div className="expense-amount">
                  {formatAmount(transaction.amount)}
                </div>
              </div>
            ))
          ) : (
            <p>支出の記録がありません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
