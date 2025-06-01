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

  // トランザクションデータを準備
  const allTransactions = React.useMemo(() => {
    if (!incomeList || !expenseList) return [];
    return [...incomeList.transactions, ...expenseList.transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [incomeList, expenseList]);

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

      <TransactionHistory transactions={allTransactions} />
    </div>
  );
};

export default HomePage;
