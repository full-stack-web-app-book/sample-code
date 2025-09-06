import { Box, Button, Text } from "@chakra-ui/react";

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
      <Button colorPalette="teal" fontWeight="bold">
        登録
      </Button>
    </>
  );
}

export default App;
