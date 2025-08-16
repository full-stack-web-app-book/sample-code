import React from "react";
import { Link } from "react-router-dom";
import BalanceSummary from "../components/BalanceSummary";
import TransactionHistory from "../components/TransactionHistory";
import { useTransactions } from "../hooks/useTransactions";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import { Center, Container } from "@chakra-ui/react";

const HomePage: React.FC = () => {
  const {
    data: financialSummary,
    isLoading: isFinancialLoading,
    error: financialError,
  } = useFinancialSummary();

  const {
    incomeList,
    expenseList,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useTransactions();

  const isLoading = isTransactionsLoading || isFinancialLoading;

  return (
    <Center>
      <Container maxW="4xl">
        <h1>シンプル家計簿</h1>

        {financialError && (
          <div className="error-message">{financialError.message}</div>
        )}
        {transactionsError && (
          <div className="error-message">{transactionsError.message}</div>
        )}

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

        <TransactionHistory
          incomeTransactions={incomeList?.transactions || []}
          expenseTransactions={expenseList?.transactions || []}
        />
      </Container>
    </Center>
  );
};

export default HomePage;
