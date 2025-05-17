import React from "react";
import { SummaryContainer, SummaryBox } from "../styles/StyledComponents";
import { formatAmount } from "../utils/transactionUtils";

interface BalanceSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  totalIncome,
  totalExpense,
  balance,
}) => {
  return (
    <SummaryContainer>
      <SummaryBox type="income">
        <h2>収入合計</h2>
        <p>{formatAmount(totalIncome)}</p>
      </SummaryBox>
      <SummaryBox type="expense">
        <h2>支出合計</h2>
        <p>{formatAmount(totalExpense)}</p>
      </SummaryBox>
      <SummaryBox type="balance">
        <h2>残高</h2>
        <p>{formatAmount(balance)}</p>
      </SummaryBox>
    </SummaryContainer>
  );
};

export default BalanceSummary;
