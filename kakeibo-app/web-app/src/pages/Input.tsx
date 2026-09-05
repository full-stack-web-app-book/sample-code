import { useState } from "react";
import { Center, Container, Tabs, Text } from "@chakra-ui/react";
import { useAddTransactions } from "@/hooks/useAddTransactions";
import { useNavigate } from "react-router";
import {
  TransactionForm,
  type TransactionFormData,
} from "@/components/TransactionForm";
import { Header } from "@/components/Header";

function InputPage() {
  const { addTransaction, createTransactionData } = useAddTransactions();
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
    <>
      <Header />
      <Container as="main" maxW="4xl" py={6}>
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
                _selected={{ color: "white" }}
                width="30%"
                justifyContent="center"
              >
                <Text fontWeight="bold">収入</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="expense"
                _selected={{ color: "white" }}
                width="30%"
                justifyContent="center"
              >
                <Text fontWeight="bold">支出</Text>
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
    </>
  );
}

export default InputPage;
