import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import TransactionHistory from "@/components/TransactionHistory";
import { useTransactions } from "@/hooks/useTransactions";
import { Box, Center, Container, Flex, Stack } from "@chakra-ui/react";
import InputButton from "@/components/InputButton";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { incomeList, expenseList, isLoading, error } = useTransactions();

  return (
    <Center>
      <Container maxW="4xl" py={6}>
        {error && <div className="error-message">{error.message}</div>}

        <Stack gap={4}>
          <Flex justifyContent="flex-end">
            <InputButton onClick={() => navigate("/input")} />
          </Flex>

          <BalanceSummary />

          <Flex gap={6}>
            <Box flex={1}>
              <TransactionHistory
                title="収入履歴"
                transactions={incomeList?.transactions || []}
              />
            </Box>
            <Box flex={1}>
              <TransactionHistory
                title="支出履歴"
                transactions={expenseList?.transactions || []}
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </Center>
  );
};

export default HomePage;
