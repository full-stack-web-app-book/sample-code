import { Header } from "@/components/Header";
import {
  Button,
  Center,
  Container,
  Field,
  HStack,
  Input,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

type TransactionType = "income" | "expense";

function InputPage() {
  const [transactionType, setTransactionType] =
    React.useState<TransactionType>("expense");

  const [item, setItem] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // amountを数値に変換
    let adjustedAmount = Number(amount);
    // 支出の場合はamountをマイナスに変換
    if (transactionType === "expense" && adjustedAmount > 0) {
      adjustedAmount = -adjustedAmount;
    }
    // フォーム送信の処理をここに追加
    console.log({
      item,
      adjustedAmount,
      date,
    });
    // トップページへ遷移
    navigate("/");
  };

  const onCancel = () => {
    // トップページへ遷移
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container as="main" maxW="4xl" py={6}>
        <Center>
          <VStack
            maxW="xl"
            width="full"
            gap={4}
            as="form"
            onSubmit={handleSubmit}
          >
            {/* 支出・収入の選択ボタン */}
            <RadioGroup.Root
              defaultValue="expense"
              onValueChange={(e) =>
                setTransactionType(e.value as TransactionType)
              }
            >
              <HStack gap={4}>
                <RadioGroup.Item value="expense">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>支出</RadioGroup.ItemText>
                </RadioGroup.Item>
                <RadioGroup.Item value="income">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>収入</RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            </RadioGroup.Root>

            {/* フォーム部分 */}
            <Field.Root required>
              <Field.Label>項目</Field.Label>
              <Input
                placeholder="項目を入力してください"
                value={item}
                onChange={(e) => setItem(e.target.value)}
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
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>日付</Field.Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field.Root>

            {/* キャンセルボタンと登録ボタン */}
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
              <Button
                type="submit"
                colorPalette="teal"
                flex={1}
                fontWeight="bold"
              >
                登録
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Container>
    </>
  );
}

export default InputPage;
