import { useState, useEffect } from "react";

// 財務サマリーの型定義
export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const fetchSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/summary`);
      if (!response.ok) {
        throw new Error("サーバーからデータの取得に失敗しました");
      }
      const summaryData = (await response.json()) as FinancialSummary;
      setData(summaryData);
    } catch (err) {
      console.error("APIエラー:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  // コンポーネントのマウント時にデータを取得
  useEffect(() => {
    fetchSummary();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};
