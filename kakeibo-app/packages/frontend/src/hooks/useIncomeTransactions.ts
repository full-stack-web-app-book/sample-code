import { useState, useEffect } from "react";
import type { TransactionList, TransactionsHooks } from "./transactions";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useIncomeTransactions = (): TransactionsHooks => {
  const [incomeList, setIncomeList] = useState<TransactionList>();
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

  useEffect(() => {
    fetchIncomeTransactions();
  }, []);

  return {
    transactionList: incomeList,
    isLoading,
    error,
    refetch: fetchIncomeTransactions,
  };
};
