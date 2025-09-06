import { useTransactions } from "@/hooks/useTransactions";
import SummaryCard from "@/components/SummaryCard";
import { Flex } from "@chakra-ui/react";
import TransactionList from "./TransactionList";

const TransactionSummary: React.FC<{ maxTransactions: number }> = ({
  maxTransactions,
}) => {
  const { incomeList, expenseList, isLoading, error } = useTransactions();

  const incomeTransactions =
    incomeList?.transactions?.slice(0, maxTransactions) || [];
  const expenseTransactions =
    expenseList?.transactions?.slice(0, maxTransactions) || [];

  return (
    <Flex gap={6}>
      <SummaryCard title="収入履歴" flex={1}>
        <TransactionList
          transactions={incomeTransactions}
          isLoading={isLoading}
          error={error}
        />
      </SummaryCard>
      <SummaryCard title="支出履歴" flex={1}>
        <TransactionList
          transactions={expenseTransactions}
          isLoading={isLoading}
          error={error}
        />
      </SummaryCard>
    </Flex>
  );
};

export default TransactionSummary;
