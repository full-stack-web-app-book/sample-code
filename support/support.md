## サポート情報

### 第10章 バックエンドのVercelデプロイが失敗する件について（2026年10月）

第10章「バックエンド用プロジェクトのセットアップ」（p.364）の手順でVercelにデプロイすると、次のエラーでビルドが失敗することがあります。

```
Error: error TS2688: Cannot find type definition file for 'node'. The file is in the program because: Entry point of type library 'node' specified in compilerOptions
```

#### 原因

本書ではTypeScriptをインストールするときにバージョンを指定していません。そのため執筆後に正式リリースされたTypeScript 7系（例：v7.0.2）が入ります。TypeScript 7系には大きな変更が含まれていて、本書のサンプルの設定ではビルドが通らなくなることがあります。

#### 対処方法

`backend` ディレクトリで以下を実行し、TypeScriptを本書の検証時と同じ5系に揃えてください。

```bash
cd ~/Projects/kakeibo-app/backend
npm install -D typescript@^5.8.3
```

実行後、`package.json` の `devDependencies` が `"typescript": "^5.8.3"` になっていることを確認します。`package.json` と `package-lock.json` をコミットしてプッシュすると、Vercelで再デプロイが始まります（始まらない場合は、Vercelのダッシュボードから［Redeploy］を実行してください）。

### 第10章 バックエンドのVercelデプロイで「public」ディレクトリのエラーが出る件について（2026年10月）

第10章「バックエンド用プロジェクトのセットアップ」（p.364〜365）の手順でデプロイすると、環境によっては次のエラーでデプロイが失敗することがあります。

```
Error: No Output Directory named "public" found after the Build completed.
Configure the Output Directory in your Project Settings.
Alternatively, configure vercel.json#outputDirectory.
```

#### 原因

環境によっては、p.364で［Framework Preset］に［Hono］を選んだあと、p.365で［Root Directory］に `backend` を指定すると、［Framework Preset］が選び直されて「Other」になり、変更できなくなる（グレーアウトする）ことがあります。「Other」のままデプロイすると、Vercelは静的サイトとして扱って `public` ディレクトリを探すため、デプロイが失敗します。

#### 対処方法

デプロイが失敗したあと、プロジェクトの設定で［Framework Preset］を［Hono］に変更してから、もう一度デプロイしてください。

1. Vercelのダッシュボードで、デプロイに失敗したプロジェクト（`kakeibo-app-backend`）を開きます
2. 上部のタブから［Settings］を開きます
3. 左メニューの［Build and Deployment］を選びます
4. ［Framework Settings］の［Framework Preset］を「Other」から「Hono」に変更し、［Save］をクリックします
5. ［Deployments］タブに戻り、失敗したデプロイの［…］メニューから［Redeploy］を実行します

デプロイに成功すると、p.366の「Congratulations!」の画面が表示されます。そこから先は本書の手順どおりに進めてください。

※ Vercelの画面は頻繁に変わるため、メニューの名前や場所が上記と違う場合があります。
