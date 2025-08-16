import React from "react";
import { formatAmount } from "../utils/transactionUtils";
import { Box, Heading, Text } from "@chakra-ui/react";

interface BalanceSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  isLoading?: boolean;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  totalIncome,
  totalExpense,
  balance,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <SummaryContainer>
        <Text>データを取得中...</Text>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <BalanceSummaryItem
        title="収入合計"
        amount={totalIncome}
        color="green.500"
      />
      <BalanceSummaryItem
        title="支出合計"
        amount={totalExpense}
        color="red.500"
      />
      <BalanceSummaryItem title="残高" amount={balance} color={"blue.500"} />
    </SummaryContainer>
  );
};

const SummaryContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {children}
    </Box>
  );
};

const BalanceSummaryItem: React.FC<{
  title: string;
  amount: number;
  color?: string;
}> = ({ title, amount, color }) => {
  return (
    <Box
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        minWidth: "150px",
      }}
    >
      <Heading size="sm">{title}</Heading>
      <Text textStyle="3xl" fontWeight="bold" color={color}>
        {formatAmount(amount)}
      </Text>
    </Box>
  );
};

export default BalanceSummary;
