import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import TransactionHistory from "@/components/TransactionHistory";
import { useTransactions } from "@/hooks/useTransactions";
import { useFinancialSummary } from "@/hooks/useFinancialSummary";
import { Center, Container, Flex, Stack } from "@chakra-ui/react";
import InputButton from "@/components/InputButton";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

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
      <Container maxW="4xl" py={6}>
        {financialError && (
          <div className="error-message">{financialError.message}</div>
        )}
        {transactionsError && (
          <div className="error-message">{transactionsError.message}</div>
        )}

        <Stack gap={4}>
          <Flex justifyContent="flex-end">
            <InputButton onClick={() => navigate("/input")} />
          </Flex>

          <BalanceSummary
            totalIncome={financialSummary?.totalIncome || 0}
            totalExpense={financialSummary?.totalExpense || 0}
            balance={financialSummary?.balance || 0}
            isLoading={isLoading}
          />

          <TransactionHistory
            incomeTransactions={incomeList?.transactions || []}
            expenseTransactions={expenseList?.transactions || []}
          />
        </Stack>
      </Container>
    </Center>
  );
};

export default HomePage;
