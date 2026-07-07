// カウンターの初期値
let counter = 0;

// DOM要素の取得
const counterDisplay = document.getElementById("counter");
const incrementBtn = document.getElementById("increment-btn");

// カウントを増加させる関数
function increment() {
  counter++;
  counterDisplay.textContent = counter;
}

// イベントリスナーの追加
incrementBtn.addEventListener("click", increment);

// 初期表示
counterDisplay.textContent = counter;
