import React from "react";
import { formatAmount } from "../utils/transactionUtils";
import { Box, Heading, Text, Flex, Separator, Stack } from "@chakra-ui/react";
import { Chart, useChart } from "@chakra-ui/charts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
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
        <BalanceGraph data={{ totalIncome, totalExpense }} />
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

const BalanceGraph: React.FC<{
  data: { totalIncome: number; totalExpense: number };
}> = ({ data }) => {
  const chartData = [
    {
      name: "収入",
      amount: data.totalIncome,
    },
    {
      name: "支出",
      amount: data.totalExpense,
    },
  ];

  const chart = useChart({
    data: chartData,
    series: [{ name: "amount", color: "teal.solid" }],
  });

  return (
    <Chart.Root maxH="sm" chart={chart}>
      <BarChart data={chart.data} margin={{ top: 30, bottom: 40 }}>
        <CartesianGrid stroke={chart.color("border.muted")} vertical={false} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => formatAmount(Number(value))} />
        {chart.series.map((item, index) => (
          <Bar
            key={index}
            radius={4}
            dataKey={chart.key(item.name)}
            fill={chart.color(item.color)}
          >
            <LabelList dataKey={chart.key("amount")} position="top" />
            {chart.data.map((item, index) => (
              <Cell
                key={index}
                fill={chart.color(item.amount > 0 ? "green.500" : "red.500")}
              />
            ))}
          </Bar>
        ))}
      </BarChart>
    </Chart.Root>
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
