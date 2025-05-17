import React from "react";
import {
  HistoryContainer,
  HistorySection,
  HistoryList,
  HistoryItem,
  HistoryDate,
  IncomeAmount,
  ExpenseAmount,
} from "../styles/StyledComponents";
import type { Transaction } from "../utils/transactionUtils";
import { formatDate, formatAmount } from "../utils/transactionUtils";

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
    <HistoryContainer>
      <HistorySection>
        <h2>収入履歴</h2>
        <HistoryList>
          {incomeTransactions.length > 0 ? (
            incomeTransactions.map((transaction) => (
              <HistoryItem key={transaction.id}>
                <div>
                  <div>{transaction.item}</div>
                  <HistoryDate>{formatDate(transaction.date)}</HistoryDate>
                </div>
                <IncomeAmount>{formatAmount(transaction.amount)}</IncomeAmount>
              </HistoryItem>
            ))
          ) : (
            <p>収入の記録がありません</p>
          )}
        </HistoryList>
      </HistorySection>

      <HistorySection>
        <h2>支出履歴</h2>
        <HistoryList>
          {expenseTransactions.length > 0 ? (
            expenseTransactions.map((transaction) => (
              <HistoryItem key={transaction.id}>
                <div>
                  <div>{transaction.item}</div>
                  <HistoryDate>{formatDate(transaction.date)}</HistoryDate>
                </div>
                <ExpenseAmount>
                  {formatAmount(transaction.amount)}
                </ExpenseAmount>
              </HistoryItem>
            ))
          ) : (
            <p>支出の記録がありません</p>
          )}
        </HistoryList>
      </HistorySection>
    </HistoryContainer>
  );
};

export default TransactionHistory;
