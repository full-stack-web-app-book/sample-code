import { useState, useEffect } from "react";
import type { Transaction } from "../utils/transactionUtils";
import { saveTransaction } from "../utils/transactionUtils";

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

  useEffect(() => {
    // APIから収入と支出の履歴を取得
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // 収入データの取得
        const incomeResponse = await fetch("/api/transactions/income");
        if (!incomeResponse.ok) {
          throw new Error("収入データの取得に失敗しました");
        }
        const incomeData = (await incomeResponse.json()) as TransactionList;
        setIncomeList(incomeData);

        // 支出データの取得
        const expenseResponse = await fetch("/api/transactions/expense");
        if (!expenseResponse.ok) {
          throw new Error("支出データの取得に失敗しました");
        }
        const expenseData = (await expenseResponse.json()) as TransactionList;
        setExpenseList(expenseData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("不明なエラーが発生しました")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // 新しい取引を追加
  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };

    // ローカルストレージに保存（将来的にはAPIでの保存に置き換え予定）
    saveTransaction(newTransaction);

    // 収入または支出リストの更新
    if (transaction.type === "income" && incomeList) {
      const updatedIncomeList = {
        ...incomeList,
        transactions: [newTransaction, ...incomeList.transactions],
        totalCount: incomeList.totalCount + 1,
        totalAmount: incomeList.totalAmount + transaction.amount,
      };
      setIncomeList(updatedIncomeList);
    } else if (transaction.type === "expense" && expenseList) {
      const updatedExpenseList = {
        ...expenseList,
        transactions: [newTransaction, ...expenseList.transactions],
        totalCount: expenseList.totalCount + 1,
        totalAmount: expenseList.totalAmount + transaction.amount,
      };
      setExpenseList(updatedExpenseList);
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
