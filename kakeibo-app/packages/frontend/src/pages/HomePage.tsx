import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import { Container, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";
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
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <Flex justifyContent="flex-end">
              <InputButton onClick={() => navigate("/input")} />
            </Flex>
          </GridItem>
          <GridItem colSpan={2}>
            <SummaryCard title="収支サマリー">
              <BalanceSummary />
            </SummaryCard>
          </GridItem>
          <GridItem>
            <SummaryCard title="収入履歴" flex={1}>
              <RecentIncomeTransactionList maxTransactions={maxTransactions} />
            </SummaryCard>
          </GridItem>
          <GridItem>
            <SummaryCard title="支出履歴" flex={1}>
              <RecentExpenseTransactionList maxTransactions={maxTransactions} />
            </SummaryCard>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
