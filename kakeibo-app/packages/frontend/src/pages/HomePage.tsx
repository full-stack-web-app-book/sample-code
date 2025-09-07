import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import { Container, Flex, Stack } from "@chakra-ui/react";
import InputButton from "@/components/InputButton";
import Header from "@/components/Header";
import {
  RecentExpenseTransactionList,
  RecentIncomeTransactionList,
} from "@/components/RecentTransactionList";
import SummaryCard from "@/components/SummaryCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const maxTransactions = 5;
  return (
    <>
      <Header />
      <Container as="main" maxW="4xl" py={6}>
        <Stack gap={6}>
          <Flex justifyContent="flex-end">
            <InputButton onClick={() => navigate("/input")} />
          </Flex>
          <SummaryCard title="収支サマリー">
            <BalanceSummary />
          </SummaryCard>
          <Flex gap={6}>
            <SummaryCard title="収入履歴" flex={1}>
              <RecentIncomeTransactionList maxTransactions={maxTransactions} />
            </SummaryCard>
            <SummaryCard title="支出履歴" flex={1}>
              <RecentExpenseTransactionList maxTransactions={maxTransactions} />
            </SummaryCard>
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
