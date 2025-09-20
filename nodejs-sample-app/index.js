// コマンドライン引数を取得
// process.argv はコマンドライン実行時の引数を配列として返す
// 最初の2つはnode実行ファイルとスクリプトファイルのパスなので
// 3つ目以降を args として取得
const args = process.argv.slice(2);

// 引数の数をチェック
if (args.length !== 2) {
  console.error("使用方法: node index.js <数値1> <数値2>");
  console.error("例: node index.js 10 20");
  process.exit(1);
}

// 引数を数値に変換
// 引数は string 型のため、number 型に変換
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// 数値の妥当性をチェック
// isNaN() は引数が数値でない場合に true を返す
if (isNaN(num1) || isNaN(num2)) {
  console.error("エラー: 両方の引数が有効な数値である必要があります");
  console.error(`入力された値: "${args[0]}", "${args[1]}"`);
  process.exit(1);
}

// 和を計算して結果を表示
const sum = num1 + num2;
console.log(`${num1} + ${num2} = ${sum}`);
