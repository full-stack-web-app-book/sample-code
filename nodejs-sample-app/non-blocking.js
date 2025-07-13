// データベースクエリをシミュレートする関数（実行時間3秒）
function databaseQuery() {
  return new Promise((resolve) => {
    console.log("データベースクエリを開始...");

    // 3秒後に解決されるPromiseを返す
    setTimeout(() => {
      const result = {
        id: 1,
        name: "サンプルデータ",
        timestamp: new Date().toISOString(),
      };
      console.log("データベースクエリが完了しました");
      resolve(result);
    }, 3000);
  });
}

// メイン関数
async function main() {
  // 長時間(3秒間)の処理を開始
  const longTask = databaseQuery();

  // その間に他の処理を実行
  console.log("データベースクエリの実行中に他の処理を実行...");

  for (let i = 1; i <= 5; i++) {
    console.log(`カウント: ${i}`);
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待機
  }

  // 長時間の処理の完了を待つ
  const result = await longTask;
  console.log("データベースクエリの結果:", result);
  console.log("");
}

// 実行
main().catch(console.error);
