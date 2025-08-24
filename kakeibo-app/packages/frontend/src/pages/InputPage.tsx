import React from "react";
import { Center, Container } from "@chakra-ui/react";
import TransactionForm from "@/components/TransactionForm";
import { useTransactions } from "@/hooks/useTransactions";

const InputPage: React.FC = () => {
  const { addTransaction } = useTransactions();

  return (
    <Center>
      <Container maxW="4xl" py={6}>
        <TransactionForm onAddTransaction={addTransaction} />
      </Container>
    </Center>
  );
};

export default InputPage;
