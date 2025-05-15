// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
  // トップページのデータを表示
  displayTransactions();
  updateSummary();
});

// 取引履歴を表示
function displayTransactions() {
  const transactions = getTransactions();
  const incomeHistory = document.getElementById("income-history");
  const expenseHistory = document.getElementById("expense-history");

  // 履歴をクリア
  incomeHistory.innerHTML = "";
  expenseHistory.innerHTML = "";

  // 日付でソート（新しい順）
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 各取引を表示
  transactions.forEach((transaction) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";

    const formattedDate = formatDate(transaction.date);
    const formattedAmount = transaction.amount.toLocaleString() + "円";

    historyItem.innerHTML = `
            <div>
                <div>${transaction.item}</div>
                <div class="history-date">${formattedDate}</div>
            </div>
            <div class="${transaction.type}-amount">${formattedAmount}</div>
        `;

    // 収入か支出かによって適切なコンテナに追加
    if (transaction.type === "income") {
      incomeHistory.appendChild(historyItem);
    } else {
      expenseHistory.appendChild(historyItem);
    }
  });

  // 履歴がない場合のメッセージ表示
  if (incomeHistory.children.length === 0) {
    incomeHistory.innerHTML = "<p>収入の記録がありません</p>";
  }
  if (expenseHistory.children.length === 0) {
    expenseHistory.innerHTML = "<p>支出の記録がありません</p>";
  }
}

// 収支サマリーを更新
function updateSummary() {
  const transactions = getTransactions();
  let totalIncome = 0;
  let totalExpense = 0;

  // 収入と支出の合計を計算
  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  // 残高を計算
  const balance = totalIncome - totalExpense;

  // 表示を更新
  document.getElementById("total-income").textContent =
    totalIncome.toLocaleString() + "円";
  document.getElementById("total-expense").textContent =
    totalExpense.toLocaleString() + "円";
  document.getElementById("balance").textContent =
    balance.toLocaleString() + "円";
}
