// 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
export const formatDate = (dateString: string): string => {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
};

// 金額をフォーマット
export const formatAmount = (amount: number): string => {
  return amount.toLocaleString() + "円";
};
