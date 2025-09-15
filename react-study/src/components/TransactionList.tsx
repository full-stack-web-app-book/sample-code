import React from "react";
import { Box, Flex, Separator, Stack, Text } from "@chakra-ui/react";

type Transaction = {
  id: number;
  item: string;
  amount: number;
  date: string;
};

export const RecentIncomeTransactionList: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const sampleTransactions: Transaction[] = [
    { id: 6, item: "ギフト", amount: 3000, date: "2025-09-28" },
    { id: 5, item: "ボーナス", amount: 150000, date: "2025-09-25" },
    { id: 4, item: "その他収入", amount: 10000, date: "2025-09-20" },
    { id: 3, item: "投資利益", amount: 20000, date: "2025-09-15" },
    { id: 2, item: "副業収入", amount: 50000, date: "2025-09-10" },
    { id: 1, item: "給料", amount: 300000, date: "2025-09-01" },
  ];

  const recentTransactions = sampleTransactions.slice(0, maxTransactions);

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
      <Text color="green.500" fontWeight="bold">
        {transaction.amount.toLocaleString()}円
      </Text>
    </Flex>
  );
};

const formatDate = (dateString: string): string => {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
};
