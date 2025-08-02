#!/usr/bin/env node

// QRコードを生成するためのライブラリをインポート
import qrcode from "qrcode-terminal";

// URL形式の簡単な検証関数
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

// qrcode-terminal の generate 関数のコールバック関数
function callback(qrcode) {
  console.log(qrcode); // QRコードを出力
  console.log("");
  console.log("QRコードが生成されました！");
}

function main() {
  // 第一引数からURLを取得
  const url = process.argv[2];

  // URLが指定されているかチェック
  if (!url) {
    console.error("エラー: URLを指定してください。");
    console.log("使用方法: node index.js <URL>");
    console.log("例: node index.js https://www.google.com");
    process.exit(1);
  }

  // URLの形式を簡単にチェック
  if (!isValidUrl(url)) {
    console.error("エラー: 有効なURLを指定してください。");
    console.log("例: https://www.example.com または http://www.example.com");
    process.exit(1);
  }

  // QRコードを生成してターミナルに表示
  console.log(`QRコードを生成中: ${url}`);
  console.log("");
  // ライブラリを使用してQRコードを生成
  // generate 関数は非同期で、生成が完了したらコールバック関数が呼ばれる
  qrcode.generate(url, { small: true }, callback);
}

main();
