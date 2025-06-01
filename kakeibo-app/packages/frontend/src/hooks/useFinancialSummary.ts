import { useState, useEffect, useCallback } from "react";

// 財務サマリーの型定義
interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

// APIから財務サマリーを取得するカスタムフック
export const useFinancialSummary = () => {
  const [data, setData] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // 財務サマリーを取得する関数
  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4010/summary");
      if (!response.ok) {
        throw new Error("サーバーからデータの取得に失敗しました");
      }

      const summaryData = await response.json();
      setData(summaryData);
      return summaryData;
    } catch (err) {
      console.error("APIエラー:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // エラー時はデフォルト値を設定
      const defaultData = { totalIncome: 0, totalExpense: 0, balance: 0 };
      setData(defaultData);
      return defaultData;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // コンポーネントのマウント時にデータを取得
  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchSummary,
  };
};
