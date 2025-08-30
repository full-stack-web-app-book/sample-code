import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import TransactionList from "@/components/TransactionList";
import { useTransactions } from "@/hooks/useTransactions";
import { Box, Center, Container, Flex, Stack } from "@chakra-ui/react";
import InputButton from "@/components/InputButton";
import SummaryCard from "@/components/SummaryCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Center>
      <Container maxW="4xl" py={6}>
        <Stack gap={4}>
          <Flex justifyContent="flex-end">
            <InputButton onClick={() => navigate("/input")} />
          </Flex>
          <BalanceSummary />
          <TransactionHistory />
        </Stack>
      </Container>
    </Center>
  );
};

const TransactionHistory: React.FC = () => {
  const { incomeList, expenseList, isLoading, error } = useTransactions();

  return (
    <Flex gap={6}>
      <Box flex={1}>
        <SummaryCard title="収入履歴">
          <TransactionList
            transactions={incomeList?.transactions}
            isLoading={isLoading}
            error={error}
          />
        </SummaryCard>
      </Box>
      <Box flex={1}>
        <SummaryCard title="支出履歴">
          <TransactionList
            transactions={expenseList?.transactions}
            isLoading={isLoading}
            error={error}
          />
        </SummaryCard>
      </Box>
    </Flex>
  );
};

export default HomePage;
