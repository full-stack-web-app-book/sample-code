import React from "react";
import {
  type Transaction,
  formatDate,
  formatAmount,
} from "../utils/transactionUtils";
import SummaryCard from "./SummaryCard";
import { Box, Flex, Separator, Stack, Text } from "@chakra-ui/react";

interface TransactionHistoryProps {
  title: string;
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  title,
  transactions,
}) => {
  return (
    <SummaryCard title={title}>
      <Stack separator={<Separator size="sm" />}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionHistoryItem
              key={transaction.id}
              transaction={transaction}
            />
          ))
        ) : (
          <p>記録がありません</p>
        )}
      </Stack>
    </SummaryCard>
  );
};

const TransactionHistoryItem: React.FC<{ transaction: Transaction }> = ({
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
        {formatAmount(transaction.amount)}
      </Text>
    </Flex>
  );
};

export default TransactionHistory;
