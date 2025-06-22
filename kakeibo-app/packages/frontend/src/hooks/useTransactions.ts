import { useState, useEffect } from "react";
import type { Transaction } from "../utils/transactionUtils";

interface TransactionList {
  transactions: Transaction[];
  totalCount: number;
  totalAmount: number;
}

export const useTransactions = () => {
  const [incomeList, setIncomeList] = useState<TransactionList | null>(null);
  const [expenseList, setExpenseList] = useState<TransactionList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // APIから収入履歴を取得
  const fetchIncomeTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 収入データの取得
      const response = await fetch("/api/transactions/income");
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
      const response = await fetch("/api/transactions/expense");
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
      if (transaction.type === "income") {
        // 収入追加APIを呼び出し
        const response = await fetch("/api/transactions/income", {
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
          throw new Error("収入の追加に失敗しました");
        }
      } else if (transaction.type === "expense" && expenseList) {
        // 支出追加APIを呼び出し
        const response = await fetch("/api/transactions/expense", {
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
          throw new Error("支出の追加に失敗しました");
        }
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
