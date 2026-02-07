# 🚌 蟹江お散歩バス時刻表アプリ

蟹江町のお散歩バスの時刻表を表示するWebアプリケーションです。

## 📱 機能

- **3つのルート対応**: オレンジルート、グリーンルート、日曜・祝日ルート
- **リアルタイム表示**: 現在時刻と次のバスまでの時間を表示
- **検索機能**: バス停名で簡単に検索
- **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応
- **視覚的な表示**: 過去の時刻は打ち消し線で表示

## 🚀 Vercelへのデプロイ方法

### 1. Vercel CLIのインストール

```bash
npm install -g vercel
```

### 2. Vercelにログイン

```bash
vercel login
```

### 3. プロジェクトをデプロイ

プロジェクトディレクトリで以下のコマンドを実行：

```bash
vercel
```

初回デプロイ時の質問には以下のように答えてください：
- Set up and deploy? → **Y**
- Which scope? → あなたのアカウントを選択
- Link to existing project? → **N**
- What's your project's name? → **kanie-bus-timetable** (または任意の名前)
- In which directory is your code located? → **./** (Enter)

### 4. 本番環境へデプロイ

```bash
vercel --prod
```

## 💻 ローカルでの開発

### 必要なもの
- Python 3.x
- モダンなWebブラウザ

### ローカルサーバーの起動

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

## 📂 ファイル構成

```
.
├── index.html              # メインHTMLファイル
├── style.css               # スタイルシート
├── app.js                  # JavaScript（アプリロジック）
├── timetable_data.json     # 時刻表データ
├── vercel.json             # Vercel設定ファイル
├── extract_timetable.py    # Excelデータ抽出スクリプト
└── 蟹江お散歩バス時刻表 Ver.2.xlsx  # 元データ
```

## 🔄 時刻表データの更新方法

Excelファイルを更新した場合：

```bash
# 仮想環境をアクティベート
source venv/bin/activate

# データを抽出
python extract_timetable.py

# Vercelに再デプロイ
vercel --prod
```

## 🌐 GitHubとの連携（推奨）

### 1. GitHubリポジトリを作成

```bash
git init
git add .
git commit -m "Initial commit: Kanie Bus Timetable App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kanie-bus-timetable.git
git push -u origin main
```

### 2. VercelとGitHubを連携

1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. "Import Project"をクリック
3. GitHubリポジトリを選択
4. デプロイ設定を確認して"Deploy"をクリック

これで、GitHubにpushするたびに自動的にデプロイされます！

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

蟹江町のお散歩バスサービスに感謝します。
