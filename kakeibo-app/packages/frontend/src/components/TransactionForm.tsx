import React, { useState, type FormEvent } from "react";
import { VStack, Input, Button, Field, HStack } from "@chakra-ui/react";
import { formatTodayDate } from "@/utils/formatter";

export interface TransactionFormData {
  item: string;
  amount: string;
  date: string;
}

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  onCancel?: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formatTodayDate());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ item, amount, date });
    // フォームをリセット
    setItem("");
    setAmount("");
    setDate(formatTodayDate());
  };
  return (
    <VStack maxW="4xl" width="full" gap={4} as="form" onSubmit={handleSubmit}>
      <Field.Root required>
        <Field.Label>項目</Field.Label>
        <Input
          placeholder="項目を入力してください"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>金額</Field.Label>
        <Input
          type="number"
          placeholder="金額を入力してください"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          required
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>日付</Field.Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </Field.Root>

      <HStack width="sm" mt={4} gap={3}>
        <Button
          type="button"
          color="gray.500"
          variant="outline"
          flex={1}
          onClick={onCancel}
          fontWeight="bold"
        >
          キャンセル
        </Button>
        <Button type="submit" colorPalette="teal" flex={1} fontWeight="bold">
          登録
        </Button>
      </HStack>
    </VStack>
  );
};
