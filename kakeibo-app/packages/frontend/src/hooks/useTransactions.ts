import { useState, useEffect } from "react";
import type { Transaction } from "../utils/transactionUtils";
import { getTransactions, saveTransaction } from "../utils/transactionUtils";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    // ローカルストレージからデータを取得
    const loadedTransactions = getTransactions();

    // 日付でソート（新しい順）
    loadedTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setTransactions(loadedTransactions);
    calculateSummary(loadedTransactions);
  }, []);

  // 収支サマリーを計算
  const calculateSummary = (data: Transaction[]) => {
    let income = 0;
    let expense = 0;

    data.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  };

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
    calculateSummary(updatedTransactions);
  };

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    addTransaction,
  };
};
