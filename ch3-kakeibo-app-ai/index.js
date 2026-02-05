// DOM要素の取得
const form = document.querySelector('form');
const transactionList = document.querySelector('ul');
const totalAmountElement = document.querySelector('.display-section p');

// LocalStorageのキー
const STORAGE_KEY = 'transactions';

// ページ読み込み時にデータを読み込み表示
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
});

// フォーム送信時の処理
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 入力値の取得
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;
    const item = document.getElementById('item').value;
    const amount = parseInt(document.getElementById('amount').value);
    
    // バリデーション（簡易）
    if (!date || !item || isNaN(amount)) {
        alert('すべてのフィールドを正しく入力してください。');
        return;
    }
    
    // 新しいトランザクションの作成
    const transaction = { date, type, item, amount };
    
    // LocalStorageに保存
    saveTransaction(transaction);
    
    // 表示更新
    renderTransactions();
    
    // フォームリセット
    form.reset();
});

// LocalStorageからデータを読み込み
function loadTransactions() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        transactions = JSON.parse(data);
    } else {
        transactions = [];
    }
    renderTransactions();
}

// 新しいトランザクションをLocalStorageに保存
function saveTransaction(transaction) {
    transactions.push(transaction);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// トランザクションを表示
function renderTransactions() {
    // リストのクリア
    transactionList.innerHTML = '';
    
    // 各トランザクションをリストに追加
    transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date} ${transaction.type === 'income' ? '収入' : '支出'} ${transaction.item} ${transaction.amount}円`;
        transactionList.appendChild(li);
    });
    
    // 合計金額の計算と表示
    const total = transactions.reduce((sum, transaction) => {
        return transaction.type === 'income' ? sum + transaction.amount : sum - transaction.amount;
    }, 0);
    totalAmountElement.textContent = `合計金額: ${total}円`;
}