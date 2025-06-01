// filepath: /Users/kz-takasaki/work/github/web-app-study/kakeibo-app/packages/frontend/src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import BalanceSummary from "../components/BalanceSummary";
import TransactionHistory from "../components/TransactionHistory";
import { useTransactions } from "../hooks/useTransactions";

const HomePage: React.FC = () => {
  const { transactions, totalIncome, totalExpense, balance, isLoading } =
    useTransactions();

  return (
    <div className="container">
      <h1>シンプル家計簿</h1>

      <BalanceSummary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        isLoading={isLoading}
      />

      <div className="button-container">
        <Link to="/input" className="add-button">
          収支を登録する
        </Link>
      </div>

      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default HomePage;
