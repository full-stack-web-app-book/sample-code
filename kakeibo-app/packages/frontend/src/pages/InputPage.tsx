import React from "react";
import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";

const InputPage: React.FC = () => {
  const { addTransaction } = useTransactions();

  return <TransactionForm onAddTransaction={addTransaction} />;
};

export default InputPage;
