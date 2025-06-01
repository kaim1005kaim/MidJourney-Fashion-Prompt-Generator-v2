# GitHubリポジトリとローカルプロジェクトのリンク手順

## 🔗 自動リンク（推奨）

1. `link-github.bat` をダブルクリックして実行
2. 指示に従って認証情報を入力（必要な場合）
3. 完了を待つ

## 🛠 手動リンク手順

### 1. Git初期化
```bash
git init
```

### 2. リモートリポジトリ追加
```bash
git remote add origin https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2.git
```

### 3. ファイルをステージング
```bash
git add .
```

### 4. 初期コミット
```bash
git commit -m "feat: 要素ベースファッションプロンプト生成システム v2.0

- 素材・シルエット・トレンドの組み合わせ生成システム
- 韓国ミニマル、Y2K、テックウェア等の最新トレンド対応  
- 互換性チェック機能
- 季節的一貫性とカラーハーモニー考慮
- 創造性レベル調整機能
- 人気の組み合わせテンプレート"
```

### 5. ブランチ設定
```bash
git branch -M main
```

### 6. 既存ファイルとの統合
```bash
git pull origin main --allow-unrelated-histories
```

### 7. プッシュ
```bash
git push -u origin main
```

## 🔐 認証エラーの場合

### Git設定
```bash
git config --global user.name "kaim1005kaim"
git config --global user.email "your-email@example.com"
```

### Personal Access Token使用
1. GitHub > Settings > Developer settings > Personal access tokens
2. 新しいトークンを生成（repo権限を付与）
3. パスワード入力時にトークンを使用

## ✅ 成功確認

リンク成功後、以下で確認：
- `git remote -v` でリモート設定確認
- `git status` で状態確認
- ブラウザで https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2 を開いてファイルが反映されているか確認

## 🚀 次のステップ

1. **Netlifyデプロイ**
   - Netlify ダッシュボードにログイン
   - 「New site from Git」を選択
   - GitHub連携でリポジトリを選択
   - ビルド設定：
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **ローカル開発継続**
   ```bash
   npm run dev
   ```
   http://localhost:5173 でテスト

3. **今後の更新**
   ```bash
   git add .
   git commit -m "update: 機能追加やバグ修正の説明"
   git push origin main
   ```
