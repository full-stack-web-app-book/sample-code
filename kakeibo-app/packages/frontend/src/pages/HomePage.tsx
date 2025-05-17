import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  ButtonContainer,
  AddButton,
} from "../styles/StyledComponents";
import BalanceSummary from "../components/BalanceSummary";
import TransactionHistory from "../components/TransactionHistory";
import { useTransactions } from "../hooks/useTransactions";

const HomePage: React.FC = () => {
  const { transactions, totalIncome, totalExpense, balance } =
    useTransactions();

  return (
    <Container>
      <h1>シンプル家計簿</h1>

      <BalanceSummary
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
      />

      <ButtonContainer>
        <Link to="/input">
          <AddButton as="span">収支を登録する</AddButton>
        </Link>
      </ButtonContainer>

      <TransactionHistory transactions={transactions} />
    </Container>
  );
};

export default HomePage;
