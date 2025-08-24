import { Card, Heading } from "@chakra-ui/react";
import React from "react";

const SummaryCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <Card.Root variant="elevated">
      <Card.Header>
        <Heading size="md">{title}</Heading>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
};

export default SummaryCard;
