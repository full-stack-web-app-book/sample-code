import React from "react";
import { formatAmount } from "../utils/transactionUtils";
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  Separator,
  Stack,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    return <Text>データを取得中...</Text>;
  }

  const chartData = [
    {
      name: "収入",
      amount: totalIncome,
      fill: "#48BB78",
    },
    {
      name: "支出",
      amount: totalExpense,
      fill: "#F56565",
    },
  ];

  return (
    <Flex gap={6} minHeight="300px">
      {/* 左側: 縦棒グラフ */}
      <Box
        flex={1}
        backgroundColor="white"
        p={4}
        borderRadius="8px"
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
      >
        <Heading size="md" mb={4} textAlign="center">
          収支グラフ
        </Heading>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatAmount(Number(value))} />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* 右側: 数値表示 */}
      <Box
        flex={1}
        backgroundColor="white"
        p={4}
        borderRadius="8px"
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
      >
        <Stack gap={2}>
          <BalanceItem title="収入" amount={totalIncome} />
          <BalanceItem title="支出" amount={totalExpense} />
          <Separator size="sm" />
          <BalanceItem title="収支" amount={balance} />
        </Stack>
      </Box>
    </Flex>
  );
};

const BalanceItem: React.FC<{
  title: string;
  amount: number;
}> = ({ title, amount }) => {
  const textColor = amount >= 0 ? "green.500" : "red.500";

  return (
    <Flex
      width="100%"
      p={4}
      borderRadius="6px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading size="sm">{title}</Heading>
      <Text fontSize="2xl" fontWeight="bold" color={textColor}>
        {formatAmount(amount)}
      </Text>
    </Flex>
  );
};

export default BalanceSummary;
