// 今日の日付をYYYY-MM-DD形式で取得
export const getToday = (): string => {
  return new Date().toISOString().split("T")[0];
};
