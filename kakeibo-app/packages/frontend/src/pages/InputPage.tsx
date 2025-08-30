import React, { useState } from "react";
import { Center, Container, Tabs } from "@chakra-ui/react";
import { useTransactions } from "@/hooks/useTransactions";
import { useNavigate } from "react-router-dom";
import {
  TransactionForm,
  type TransactionFormData,
} from "@/components/TransactionForm";

const InputPage: React.FC = () => {
  const { addTransaction, createTransactionData } = useTransactions();
  const [type, setType] = useState<"income" | "expense">("expense");

  const navigate = useNavigate();

  const handleFormSubmit = (data: TransactionFormData) => {
    const transactionData = createTransactionData(
      type,
      data.item,
      Number(data.amount),
      data.date
    );

    addTransaction(transactionData);
    navigate("/");
  };

  const handleCancel = () => {
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
          <Tabs.List
            bg="bg.muted"
            rounded="lg"
            mb="4"
            justifyContent="center"
            width="100%"
          >
            <Tabs.Trigger
              value="income"
              _selected={{ color: "white", fontWeight: "bold" }}
              width="30%"
              justifyContent="center"
            >
              収入
            </Tabs.Trigger>
            <Tabs.Trigger
              value="expense"
              _selected={{ color: "white", fontWeight: "bold" }}
              width="30%"
              justifyContent="center"
            >
              支出
            </Tabs.Trigger>
            <Tabs.Indicator
              rounded="l2"
              bg={type === "expense" ? "red.500" : "green.500"}
            />
          </Tabs.List>
          <Tabs.Content value="expense">
            <TransactionForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </Tabs.Content>
          <Tabs.Content value="income">
            <TransactionForm
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Center>
    </Container>
  );
};

export default InputPage;
