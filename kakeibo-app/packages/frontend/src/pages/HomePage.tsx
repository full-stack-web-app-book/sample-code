import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import TransactionList from "@/components/TransactionList";
import { useTransactions } from "@/hooks/useTransactions";
import { Container, Flex, Stack } from "@chakra-ui/react";
import InputButton from "@/components/InputButton";
import SummaryCard from "@/components/SummaryCard";
import Header from "@/components/Header";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container as="main" maxW="4xl" py={6}>
        <Stack gap={6}>
          <Flex justifyContent="flex-end">
            <InputButton onClick={() => navigate("/input")} />
          </Flex>
          <BalanceSummary />
          <TransactionHistory />
        </Stack>
      </Container>
    </>
  );
};

const TransactionHistory: React.FC = () => {
  const { incomeList, expenseList, isLoading, error } = useTransactions();

  return (
    <Flex gap={6}>
      <SummaryCard title="収入履歴" flex={1}>
        <TransactionList
          transactions={incomeList?.transactions}
          isLoading={isLoading}
          error={error}
        />
      </SummaryCard>
      <SummaryCard title="支出履歴" flex={1}>
        <TransactionList
          transactions={expenseList?.transactions}
          isLoading={isLoading}
          error={error}
        />
      </SummaryCard>
    </Flex>
  );
};

export default HomePage;
