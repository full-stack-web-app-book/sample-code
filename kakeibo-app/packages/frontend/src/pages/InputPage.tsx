import React, { useState, type FormEvent } from "react";
import {
  Center,
  Container,
  Tabs,
  VStack,
  Input,
  Button,
  Field,
} from "@chakra-ui/react";
import { useTransactions } from "@/hooks/useTransactions";
import { formatTodayDate, type Transaction } from "@/utils/transactionUtils";
import { useNavigate } from "react-router-dom";

const InputPage: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<"income" | "expense">("expense");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formatTodayDate());

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTransaction: Omit<Transaction, "id"> = {
      type,
      item,
      amount: Number(amount),
      date,
    };

    addTransaction(newTransaction);
    navigate("/");
  };

  const handleTabChange = (value: string) => {
    setType(value as "income" | "expense");
  };

  return (
    <Container maxW="4xl" py={6}>
      <Center>
        <Tabs.Root
          defaultValue="expense"
          variant="plain"
          onValueChange={({ value }) => handleTabChange(value)}
          width="full"
          maxW="xl"
        >
          <Tabs.List bg="bg.muted" rounded="lg" mb="4">
            <Tabs.Trigger value="expense">支出</Tabs.Trigger>
            <Tabs.Trigger value="income">収入</Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="expense">
            <VStack
              maxW="4xl"
              width="full"
              gap={4}
              as="form"
              onSubmit={handleSubmit}
            >
              <Field.Root required>
                <Field.Label fontSize="14px" fontWeight="500" lineHeight="1.2">
                  項目
                </Field.Label>
                <Input
                  placeholder="項目を入力してください"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label fontSize="14px" fontWeight="500" lineHeight="1.2">
                  金額
                </Field.Label>
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
                <Field.Label fontSize="14px" fontWeight="500" lineHeight="1.2">
                  日付
                </Field.Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Field.Root>

              <Button type="submit" colorPalette="cyan" width="sm" mt={4}>
                登録
              </Button>
            </VStack>
          </Tabs.Content>
          <Tabs.Content value="income">
            <VStack
              maxW="4xl"
              width="full"
              gap={4}
              as="form"
              onSubmit={handleSubmit}
            >
              <Field.Root required>
                <Field.Label fontSize="14px" fontWeight="500" lineHeight="1.2">
                  項目
                </Field.Label>
                <Input
                  placeholder="項目を入力してください"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label fontSize="14px" fontWeight="500" lineHeight="1.2">
                  金額
                </Field.Label>
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
                <Field.Label fontSize="14px" fontWeight="500" lineHeight="1.2">
                  日付
                </Field.Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Field.Root>

              <Button type="submit" colorPalette="cyan" width="sm" mt={4}>
                登録
              </Button>
            </VStack>
          </Tabs.Content>
        </Tabs.Root>
      </Center>
    </Container>
  );
};

export default InputPage;
