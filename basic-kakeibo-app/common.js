// データを保存するためのキー
const STORAGE_KEY = "kakeibo-data";

// 取引データを保存
function saveTransaction(transaction) {
  // 既存のデータを取得
  const transactions = getTransactions();

  // 新しいデータを追加
  transactions.push(transaction);

  // ローカルストレージに保存
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// 取引データを取得
function getTransactions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
function formatDate(dateString) {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
}
