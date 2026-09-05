import React from "react";
import { formatDate, formatAmount } from "@/utils/formatter";
import {
  Box,
  Flex,
  Separator,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Transaction } from "@/hooks/transactions";
import { useIncomeTransactions } from "@/hooks/useIncomeTransactions";
import { useExpenseTransactions } from "@/hooks/useExpenseTransactions";

interface TransactionListProps {
  transactions?: Transaction[];
  isLoading?: boolean;
  error?: Error | null;
}

export const RecentIncomeTransactionList: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const { transactionList, isLoading, error } = useIncomeTransactions();

  const transactions =
    transactionList?.transactions?.slice(0, maxTransactions) || [];

  return (
    <TransactionList
      transactions={transactions}
      isLoading={isLoading}
      error={error}
    />
  );
};

export const RecentExpenseTransactionList: React.FC<{
  maxTransactions: number;
}> = ({ maxTransactions }) => {
  const { transactionList, isLoading, error } = useExpenseTransactions();

  const transactions =
    transactionList?.transactions?.slice(0, maxTransactions) || [];

  return (
    <TransactionList
      transactions={transactions}
      isLoading={isLoading}
      error={error}
    />
  );
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  error,
}) => {
  return (
    <Stack separator={<Separator size="sm" />}>
      {isLoading ? (
        <SkeletonText />
      ) : error ? (
        <Text color="red.500">データの取得に失敗しました</Text>
      ) : transactions?.length && transactions?.length > 0 ? (
        transactions?.map((transaction) => (
          <TransactionListItem key={transaction.id} transaction={transaction} />
        ))
      ) : (
        <Text>記録がありません</Text>
      )}
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
        {formatAmount(transaction.amount)}
      </Text>
    </Flex>
  );
};
