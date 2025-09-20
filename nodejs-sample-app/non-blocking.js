// ファイル読み込みをシミュレートする関数（実行時間3秒）
function readFileMock() {
  return new Promise((resolve) => {
    // 処理の実行を開始
    console.log("【ファイル読み込み】ファイル読み込みを開始...");

    // 3秒後に以下の処理を実行する
    setTimeout(() => {
      const result = "Hello World!";
      console.log("【ファイル読み込み】ファイル読み込みが完了しました");
      resolve(result);
    }, 3000); // 3000ms
  });
}

// メイン関数
async function main() {
  // 長時間(3秒間)の処理を実行
  const readFileResult = readFileMock();

  // その間に他の処理を実行
  console.log("===================");
  console.log("ファイル読み込みの実行中に他の処理を実行...");
  for (let i = 1; i <= 5; i++) {
    console.log(`カウント: ${i}`);
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待機
  }
  console.log("他の処理が完了しました");
  console.log("===================");

  // 長時間の処理の完了を待つ
  const result = await readFileResult;
  console.log("ファイル読み込みの結果");
  console.log(result);
}

// 実行
main().catch(console.error);
