import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

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
      </Container>
    </>
  );
}

export default App;
