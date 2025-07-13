// データベースクエリをシミュレートする関数（3秒の実行時間）
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

// 他の処理をシミュレートする関数
function otherTask(taskName, duration) {
  return new Promise((resolve) => {
    console.log(`${taskName}を開始...`);
    setTimeout(() => {
      console.log(`${taskName}が完了しました`);
      resolve(`${taskName}の結果`);
    }, duration);
  });
}

// 同期的（順次）実行の例
async function sequentialExecution() {
  console.log("\n=== 同期的実行（順次実行）===");
  const startTime = Date.now();

  await databaseQuery();
  await otherTask("ファイル処理", 2000);
  await otherTask("API呼び出し", 1000);

  const endTime = Date.now();
  console.log(`総実行時間: ${endTime - startTime}ms\n`);
}

// 非同期的（並列）実行の例
async function parallelExecution() {
  console.log("=== 非同期実行（並列実行）===");
  const startTime = Date.now();

  // すべての処理を同時に開始
  const [dbResult, fileResult, apiResult] = await Promise.all([
    databaseQuery(),
    otherTask("ファイル処理", 2000),
    otherTask("API呼び出し", 1000),
  ]);

  const endTime = Date.now();
  console.log("すべての処理が完了しました");
  console.log("結果:", { dbResult, fileResult, apiResult });
  console.log(`総実行時間: ${endTime - startTime}ms\n`);
}

// ノンブロッキングの実証
async function demonstrateNonBlocking() {
  console.log("=== ノンブロッキング処理の実証 ===");

  // 長時間の処理を開始（awaitしない）
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

// メイン関数
async function main() {
  console.log("プログラム開始\n");

  // 各実行方法をテスト
  await sequentialExecution();
  await parallelExecution();
  await demonstrateNonBlocking();

  console.log("プログラム終了");
}

// 実行
main().catch(console.error);
