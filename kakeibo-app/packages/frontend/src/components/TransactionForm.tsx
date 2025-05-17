import React, { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormGroup,
  Label,
  Input,
  RadioGroup,
  ButtonContainer,
  AddButton,
  CancelButton,
} from "../styles/StyledComponents";
import type { Transaction } from "../utils/transactionUtils";

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
}) => {
  const navigate = useNavigate();
  const [type, setType] = useState<"income" | "expense">("income");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formatTodayDate());

  // 今日の日付をYYYY-MM-DD形式で取得
  function formatTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTransaction: Omit<Transaction, "id"> = {
      type,
      item,
      amount: Number(amount),
      date,
    };

    onAddTransaction(newTransaction);
    navigate("/");
  };

  return (
    <Container>
      <h1>収支の登録</h1>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>種類：</Label>
          <RadioGroup>
            <label>
              <input
                type="radio"
                value="income"
                checked={type === "income"}
                onChange={() => setType("income")}
              />
              収入
            </label>
            <label>
              <input
                type="radio"
                value="expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
              />
              支出
            </label>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="item">項目：</Label>
          <Input
            type="text"
            id="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="例：給料、食費、交通費など"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="amount">金額（円）：</Label>
          <Input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            placeholder="例：10000"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">日付：</Label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <ButtonContainer>
          <AddButton type="submit">登録する</AddButton>
          <CancelButton type="button" onClick={() => navigate("/")}>
            キャンセル
          </CancelButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default TransactionForm;
