import React, { useState } from "react";
import { Center, Container, Tabs } from "@chakra-ui/react";
import { useTransactions } from "@/hooks/useTransactions";
import { type Transaction } from "@/utils/transactionUtils";
import { useNavigate } from "react-router-dom";
import {
  TransactionForm,
  type TransactionFormData,
} from "@/components/TransactionForm";

const InputPage: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<"income" | "expense">("expense");

  const navigate = useNavigate();

  const handleFormSubmit = (data: TransactionFormData) => {
    const newTransaction: Omit<Transaction, "id"> = {
      type,
      item: data.item,
      amount: Number(data.amount),
      date: data.date,
    };

    addTransaction(newTransaction);
    navigate("/");
  };

  const handleTabChange = (value: string) => {
    setType(value as "income" | "expense");
  };

  return (
    <Container maxW="4xl" py={6}>
      <Center>
        <Tabs.Root
          defaultValue="expense"
          variant="plain"
          onValueChange={({ value }) => handleTabChange(value)}
          width="full"
          maxW="xl"
        >
          <Tabs.List bg="bg.muted" rounded="lg" mb="4">
            <Tabs.Trigger value="expense">支出</Tabs.Trigger>
            <Tabs.Trigger value="income">収入</Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="expense">
            <TransactionForm onSubmit={handleFormSubmit} />
          </Tabs.Content>
          <Tabs.Content value="income">
            <TransactionForm onSubmit={handleFormSubmit} />
          </Tabs.Content>
        </Tabs.Root>
      </Center>
    </Container>
  );
};

export default InputPage;
