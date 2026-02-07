# 🚀 Vercelへのデプロイ手順

## 方法1: Vercel CLI（コマンドライン）

### ステップ1: Vercel CLIをインストール

```bash
npm install -g vercel
```

### ステップ2: Vercelにログイン

```bash
vercel login
```

ブラウザが開くので、GitHubアカウントでログインしてください。

### ステップ3: デプロイ

```bash
cd /Users/imaichika/bas
vercel
```

初回デプロイ時の質問：
- **Set up and deploy?** → `Y`
- **Which scope?** → あなたのアカウントを選択
- **Link to existing project?** → `N`
- **What's your project's name?** → `kanie-bus-timetable`
- **In which directory is your code located?** → `./` (Enterを押す)

### ステップ4: 本番環境へデプロイ

```bash
vercel --prod
```

デプロイが完了すると、URLが表示されます！

---

## 方法2: Vercel Dashboard（ブラウザ）

### ステップ1: GitHubにプッシュ

```bash
cd /Users/imaichika/bas
git push origin main
```

### ステップ2: Vercelにインポート

1. [Vercel Dashboard](https://vercel.com/new)にアクセス
2. "Import Git Repository"をクリック
3. GitHubリポジトリを選択
4. プロジェクト設定：
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (空欄のまま)
   - **Output Directory**: (空欄のまま)
5. "Deploy"をクリック

数分でデプロイが完了します！

---

## 📱 デプロイ後の確認

デプロイが成功すると、以下のようなURLが発行されます：
```
https://kanie-bus-timetable.vercel.app
```

このURLをスマートフォンやPCのブラウザで開いて、アプリが正常に動作することを確認してください。

---

## 🔄 更新方法

### 時刻表データを更新する場合

1. Excelファイルを更新
2. データを抽出：
   ```bash
   source venv/bin/activate
   python extract_timetable.py
   ```
3. Gitにコミット：
   ```bash
   git add timetable_data.json
   git commit -m "Update timetable data"
   git push origin main
   ```

GitHubとVercelを連携している場合、自動的に再デプロイされます！

### デザインやコードを更新する場合

```bash
git add .
git commit -m "Update design/code"
git push origin main
```

---

## 🎯 カスタムドメインの設定

Vercel Dashboardから独自ドメインを設定できます：

1. プロジェクトの"Settings"タブを開く
2. "Domains"セクションで独自ドメインを追加
3. DNSレコードを設定（Vercelが指示を表示）

例: `bus.kanie-town.jp`

---

## ⚡ パフォーマンス最適化

Vercelは自動的に以下を提供します：
- ✅ グローバルCDN
- ✅ 自動HTTPS
- ✅ 高速キャッシング
- ✅ 自動スケーリング

---

## 🆘 トラブルシューティング

### デプロイが失敗する場合

1. `vercel.json`が正しく配置されているか確認
2. 必要なファイルがすべてコミットされているか確認：
   ```bash
   git status
   ```

### アプリが表示されない場合

1. ブラウザのキャッシュをクリア
2. Vercel Dashboardでデプロイログを確認
3. `timetable_data.json`が正しく配置されているか確認

---

## 📞 サポート

問題が解決しない場合は、[Vercelのドキュメント](https://vercel.com/docs)を参照してください。
