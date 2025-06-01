import React from "react";
import { Link } from "react-router-dom";
import BalanceSummary from "../components/BalanceSummary";
import TransactionHistory from "../components/TransactionHistory";
import { useTransactions } from "../hooks/useTransactions";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

const HomePage: React.FC = () => {
  const {
    incomeList,
    expenseList,
    isLoading: isTransactionsLoading,
    error,
  } = useTransactions();
  const { data: financialSummary, isLoading: isFinancialLoading } =
    useFinancialSummary();

  const isLoading = isTransactionsLoading || isFinancialLoading;

  return (
    <div className="container">
      <h1>シンプル家計簿</h1>

      <BalanceSummary
        totalIncome={financialSummary?.totalIncome || 0}
        totalExpense={financialSummary?.totalExpense || 0}
        balance={financialSummary?.balance || 0}
        isLoading={isLoading}
      />

      <div className="button-container">
        <Link to="/input" className="add-button">
          収支を登録する
        </Link>
      </div>

      {error && <p className="error-message">エラー: {error.message}</p>}

      <TransactionHistory
        incomeTransactions={incomeList?.transactions || []}
        expenseTransactions={expenseList?.transactions || []}
      />
    </div>
  );
};

export default HomePage;
