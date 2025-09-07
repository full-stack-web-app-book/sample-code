import { useExpenseTransactions } from "@/hooks/useExpenseTransactions";
import TransactionList from "./TransactionList";
import { useIncomeTransactions } from "@/hooks/useIncomeTransactions";
import type React from "react";

export const IncomeTransactionSummary: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const { transactionList, isLoading, error } = useIncomeTransactions();

  const transactions =
    transactionList?.transactions?.slice(0, maxTransactions) || [];

  return (
    <TransactionList
      transactions={transactions}
      isLoading={isLoading}
      error={error}
    />
  );
};

export const ExpenseTransactionSummary: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const { transactionList, isLoading, error } = useExpenseTransactions();

  const transactions =
    transactionList?.transactions?.slice(0, maxTransactions) || [];

  return (
    <TransactionList
      transactions={transactions}
      isLoading={isLoading}
      error={error}
    />
  );
};
