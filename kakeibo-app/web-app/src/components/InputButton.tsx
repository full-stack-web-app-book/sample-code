import { Button } from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";

const InputButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick} colorPalette="teal" fontWeight="bold">
      <FaPlus /> 登録
    </Button>
  );
};

export default InputButton;
