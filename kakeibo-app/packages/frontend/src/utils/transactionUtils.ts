export interface Transaction {
  id: number;
  type: "income" | "expense";
  item: string;
  amount: number;
  date: string;
}

// ローカルストレージのキー
export const STORAGE_KEY = "kakeibo-data";

// 取引データを保存
export const saveTransaction = (transaction: Transaction): void => {
  // 既存のデータを取得
  const transactions = getTransactions();

  // 新しいデータを追加
  transactions.push(transaction);

  // ローカルストレージに保存
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

// 取引データを取得
export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
export const formatDate = (dateString: string): string => {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
};

// 金額をフォーマット
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString() + "円";
};
