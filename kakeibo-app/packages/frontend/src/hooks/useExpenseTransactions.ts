import { useState, useEffect } from "react";
import type { TransactionList, TransactionsHooks } from "./transactions";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useExpenseTransactions = (): TransactionsHooks => {
  const [expenseList, setExpenseList] = useState<TransactionList>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
    fetchExpenseTransactions();
  }, []);

  return {
    transactionList: expenseList,
    isLoading,
    error,
    refetch: fetchExpenseTransactions,
  };
};
