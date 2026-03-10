import { useState, useEffect } from "react";
import type { TransactionListInfo, TransactionsHooks } from "./transactions";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 収入データの取得
export const useIncomeTransactions = (): TransactionsHooks => {
  // ①stateの定義
  const [incomeList, setIncomeList] = useState<TransactionListInfo>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // APIから収入履歴を取得
  const fetchIncomeTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 収入データの取得
      const response = await fetch(`${BASE_URL}/transactions?type=income`); // ②データの取得
      if (!response.ok) {
        throw new Error("収入データの取得に失敗しました");
      }
      const data = (await response.json()) as TransactionListInfo;
      setIncomeList(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("不明なエラーが発生しました"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ③画面表示時にデータ取得
  useEffect(() => {
    fetchIncomeTransactions();
  }, []);

  // ④変数・関数を返す
  return {
    transactionList: incomeList,
    isLoading,
    error,
    refetch: fetchIncomeTransactions,
  };
};
