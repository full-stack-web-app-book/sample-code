import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;
