import React from "react";
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
    <div className="summary-container">
      <div className="summary-box income">
        <h2>収入合計</h2>
        <p>{formatAmount(totalIncome)}</p>
      </div>
      <div className="summary-box expense">
        <h2>支出合計</h2>
        <p>{formatAmount(totalExpense)}</p>
      </div>
      <div className="summary-box balance">
        <h2>残高</h2>
        <p className={balance < 0 ? "negative" : ""}>{formatAmount(balance)}</p>
      </div>
    </div>
  );
};

export default BalanceSummary;
