import { useState, useEffect } from "react";
import type { Transaction } from "../utils/transactionUtils";
import { getTransactions, saveTransaction } from "../utils/transactionUtils";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // ローカルストレージからトランザクションデータを取得
    const loadedTransactions = getTransactions();

    // 日付でソート（新しい順）
    loadedTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setTransactions(loadedTransactions);
  }, []);

  // 新しい取引を追加
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };

    // ローカルストレージに保存
    saveTransaction(newTransaction);

    // 状態を更新
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
  };

  return {
    transactions,
    addTransaction,
  };
};
