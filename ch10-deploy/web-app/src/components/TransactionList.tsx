import React from "react";
import { Box, Flex, Separator, Stack, Text } from "@chakra-ui/react";
import { useIncomeTransactions } from "../hooks/useIncomeTransactions"
import { useExpenseTransactions } from "../hooks/useExpenseTransactions";

type Transaction = {
  id: number;
  item: string;
  amount: number;
  date: string;
};

export const RecentIncomeTransactionList: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const { transactionList } = useIncomeTransactions();

  if (!transactionList) {
    return <Text>収入データがありません</Text>;
  }

  const recentTransactions = transactionList.transactions.slice(0, maxTransactions);

  return <TransactionList transactions={recentTransactions} />;
};

export const RecentExpenseTransactionList: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const { transactionList } = useExpenseTransactions();

  if (!transactionList) {
    return <Text>支出データがありません</Text>;
  }

  const recentTransactions = transactionList.transactions.slice(0, maxTransactions);

  return <TransactionList transactions={recentTransactions} />;
};

const TransactionList: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <Stack separator={<Separator size="sm" />}>
      {transactions?.map((transaction) => (
        <TransactionListItem key={transaction.id} transaction={transaction} />
      ))}
    </Stack>
  );
};

const TransactionListItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <Text>{transaction.item}</Text>
        <Text color="gray.400" fontSize="sm">
          {formatDate(transaction.date)}
        </Text>
      </Box>
      <Text
        color={transaction.amount > 0 ? "green.500" : "red.500"}
        fontWeight="bold"
      >
        {transaction.amount.toLocaleString()}円
      </Text>
    </Flex>
  );
};

const formatDate = (dateString: string): string => {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
};
