import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { RecentIncomeTransactionList } from "./components/TransactionList";

function App() {
  return (
    <>
      <Box
        as="header"
        bg="teal.500"
        color="white"
        py={4}
        textAlign="center"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold">
          シンプル家計簿
        </Text>
      </Box>
      <Container as="main" maxW="4xl" py={6}>
        <Flex justifyContent="flex-end">
          <Button colorPalette="teal" fontWeight="bold">
            <FaPlus />
            登録
          </Button>
        </Flex>
        <SummaryCard title="収入履歴">
          <RecentIncomeTransactionList maxTransactions={3} />
        </SummaryCard>
      </Container>
    </>
  );
}

const SummaryCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Heading size="md">{title}</Heading>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
};

export default App;
