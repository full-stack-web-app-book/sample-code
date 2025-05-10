// データを保存するためのキー
const STORAGE_KEY = "kakeibo-data";

// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
  // 入力フォームの初期化（入力ページの場合）
  const form = document.getElementById("transaction-form");
  if (form) {
    initForm();
  }

  // トップページの場合、データを表示
  if (document.getElementById("income-history")) {
    displayTransactions();
    updateSummary();
  }
});

// フォームの初期化
function initForm() {
  const form = document.getElementById("transaction-form");
  const dateInput = document.getElementById("date");

  // 現在の日付をデフォルト値に設定
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${year}-${month}-${day}`;

  // フォーム送信処理
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.querySelector('input[name="type"]:checked').value;
    const item = document.getElementById("item").value;
    const amount = parseInt(document.getElementById("amount").value);
    const date = document.getElementById("date").value;

    // 新しい取引データを作成
    const transaction = {
      id: Date.now(), // ユニークなID
      type: type,
      item: item,
      amount: amount,
      date: date,
    };

    // データを保存
    saveTransaction(transaction);

    // トップページへリダイレクト
    window.location.href = "index.html";
  });
}

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

// 日付をフォーマット（YYYY-MM-DD → YYYY年MM月DD日）
function formatDate(dateString) {
  const parts = dateString.split("-");
  return `${parts[0]}年${parts[1]}月${parts[2]}日`;
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
