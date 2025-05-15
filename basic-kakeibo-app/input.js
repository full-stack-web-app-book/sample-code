// ページ読み込み時の処理
document.addEventListener("DOMContentLoaded", function () {
  // 入力フォームの初期化
  initForm();
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
