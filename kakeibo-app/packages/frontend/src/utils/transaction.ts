export interface Transaction {
  id: number;
  item: string;
  amount: number;
  date: string;
}

// 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
export const formatDate = (dateString: string): string => {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
};

// 金額をフォーマット
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString() + "円";
};

// 今日の日付をYYYY-MM-DD形式で取得
export const formatTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
