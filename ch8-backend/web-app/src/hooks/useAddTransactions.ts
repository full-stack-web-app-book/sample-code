import { useState } from "react";
import type { Transaction } from "./transactions";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAddTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 新しい取引を追加
  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      setIsLoading(true);
      setError(null);
      // 取引追加APIを呼び出し
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: transaction.item,
          amount: transaction.amount,
          date: transaction.date,
        }),
      });

      if (!response.ok) {
        throw new Error("取引の追加に失敗しました");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("取引の追加中にエラーが発生しました"),
      );
      throw err; // エラーを上位コンポーネントに伝播させる
    } finally {
      setIsLoading(false);
    }
  };

  // 取引データを作成するヘルパー関数
  const createTransactionData = (
    type: "income" | "expense",
    item: string,
    amount: number,
    date: string,
  ): Omit<Transaction, "id"> => {
    // typeがincomeの場合はamountをそのまま、expenseの場合は負の数にする
    const adjustedAmount =
      type === "income" ? Math.abs(amount) : -Math.abs(amount);
    return {
      item,
      amount: adjustedAmount,
      date,
    };
  };

  return {
    isLoading,
    error,
    addTransaction,
    createTransactionData,
  };
};
