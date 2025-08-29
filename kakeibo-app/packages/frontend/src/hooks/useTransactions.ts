import { useState, useEffect } from "react";
import type { Transaction } from "../utils/transactionUtils";

interface TransactionList {
  transactions: Transaction[];
  totalCount: number;
  totalAmount: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useTransactions = () => {
  const [incomeList, setIncomeList] = useState<TransactionList>();
  const [expenseList, setExpenseList] = useState<TransactionList>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // APIから収入履歴を取得
  const fetchIncomeTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 収入データの取得
      const response = await fetch(`${BASE_URL}/transactions?type=income`);
      if (!response.ok) {
        throw new Error("収入データの取得に失敗しました");
      }
      const data = (await response.json()) as TransactionList;
      setIncomeList(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("不明なエラーが発生しました")
      );
    } finally {
      setIsLoading(false);
    }
  };

  // APIから支出履歴を取得
  const fetchExpenseTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 支出データの取得
      const response = await fetch(`${BASE_URL}/transactions?type=expense`);
      if (!response.ok) {
        throw new Error("支出データの取得に失敗しました");
      }
      const data = (await response.json()) as TransactionList;
      setExpenseList(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("不明なエラーが発生しました")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeTransactions();
    fetchExpenseTransactions();
  }, []);

  // 新しい取引を追加
  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      // 取引追加APIを呼び出し
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: transaction.type,
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
          : new Error("取引の追加中にエラーが発生しました")
      );
      throw err; // エラーを上位コンポーネントに伝播させる
    }
  };

  return {
    incomeList,
    expenseList,
    isLoading,
    error,
    addTransaction,
  };
};
