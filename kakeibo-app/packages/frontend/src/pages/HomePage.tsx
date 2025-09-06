import React from "react";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "@/components/BalanceSummary";
import { Container, Flex, Stack } from "@chakra-ui/react";
import InputButton from "@/components/InputButton";
import Header from "@/components/Header";
import TransactionSummary from "@/components/TransactionSummary";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container as="main" maxW="4xl" py={6}>
        <Stack gap={6}>
          <Flex justifyContent="flex-end">
            <InputButton onClick={() => navigate("/input")} />
          </Flex>
          <BalanceSummary />
          <TransactionSummary maxTransactions={5} />
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
