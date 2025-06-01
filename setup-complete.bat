@echo off
echo "=== Git設定とGitHubリポジトリリンク ==="
echo.

REM Git設定（ユーザー情報）
echo "📧 Git設定を更新中..."
git config --global user.name "kaim1005kaim"
git config --global user.email "kai.moriguchi1005@gmail.com"
echo "✅ Git設定完了"
echo.

REM 設定確認
echo "📋 現在のGit設定:"
echo "ユーザー名: %git config --global user.name%"
git config --global user.name
echo "メールアドレス: %git config --global user.email%"
git config --global user.email
echo.

REM 現在のディレクトリを確認
echo "現在のディレクトリ: %CD%"
echo.

REM Git初期化（既に存在する場合はスキップ）
if not exist .git (
    echo "🔧 Git初期化中..."
    git init
    echo.
) else (
    echo "ℹ️  Gitリポジトリは既に初期化されています"
    echo.
)

REM 既存のリモートを削除（存在する場合）
echo "🧹 既存のリモート設定をクリア中..."
git remote remove origin 2>nul
echo.

REM 新しいリモートリポジトリを追加
echo "🔗 GitHubリポジトリをリモートとして追加中..."
git remote add origin https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2.git
echo.

REM リモート設定確認
echo "📡 リモート設定確認:"
git remote -v
echo.

REM ファイルをステージング
echo "📦 すべてのファイルをステージング中..."
git add .
echo.

REM 現在のステージング状況確認
echo "📋 ステージングされたファイル:"
git diff --cached --name-only
echo.

REM コミット作成
echo "💾 初期コミット作成中..."
git commit -m "feat: 要素ベースファッションプロンプト生成システム v2.0

🎨 新機能:
- 素材・シルエット・トレンドの組み合わせ生成システム
- 韓国ミニマル、Y2K、テックウェア等の最新トレンド対応
- 互換性チェック機能で最適な組み合わせを提案
- 季節的一貫性とカラーハーモニー考慮
- 創造性レベル調整機能（保守的〜実験的）
- 人気の組み合わせテンプレート

💎 主要素材:
- ニット系: カシミア、ウール、コットンニット、モヘア
- デニム系: ローデニム、ダメージデニム、ブラックデニム
- Tシャツ系: オーガニックコットン、ヴィンテージコットン
- 高級素材: シルクシャルムーズ、ラムスキンレザー

👗 主要シルエット:
- オーバーサイズセーター、フィットタートルネック
- スキニージーンズ、ワイドレッグジーンズ、クロップドジーンズ
- オーバーサイズTシャツ、クロップトップ
- Aラインドレス、スリップドレス

🌟 主要トレンド:
- 韓国ミニマル、Y2Kリバイバル、コテージコア
- ダークアカデミア、テックウェア、インディースリーズ
- マキシマリストカラー、サステナブルシック
- ジャパニーズストリート、スカンジミニマリズム

🛠 技術スタック:
- React 18 + TypeScript
- Tailwind CSS
- Vite
- Lucide React Icons"

if %ERRORLEVEL% NEQ 0 (
    echo "❌ コミット作成に失敗しました。"
    echo "💡 可能性: ステージングするファイルがない、またはGit設定の問題"
    pause
    exit /b 1
)
echo "✅ コミット作成成功"
echo.

REM ブランチを main に設定
echo "🌿 メインブランチを設定中..."
git branch -M main
echo.

REM GitHub からの既存ファイルをプル（READMEなどがある場合）
echo "⬇️  GitHubからの既存ファイルを統合中..."
git pull origin main --allow-unrelated-histories --no-edit
if %ERRORLEVEL% NEQ 0 (
    echo "⚠️  プル中に競合が発生した可能性があります。手動で解決してください。"
)
echo.

REM プッシュ実行
echo "🚀 GitHubにプッシュ中..."
git push -u origin main
echo.

if %ERRORLEVEL% EQU 0 (
    echo "🎉 正常にGitHubリポジトリとリンクされました！"
    echo.
    echo "✅ 完了したタスク:"
    echo "1. Git設定更新 (kai.moriguchi1005@gmail.com)"
    echo "2. リモートリポジトリ追加"
    echo "3. 全ファイルのコミット"
    echo "4. GitHubへのプッシュ"
    echo.
    echo "🌐 確認URL:"
    echo "https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2"
    echo.
    echo "🚀 次のステップ:"
    echo "1. ブラウザで上記URLを開いてファイルが反映されているか確認"
    echo "2. Netlifyでこのリポジトリを連携してデプロイ"
    echo "3. ローカル開発: start-dev.bat を実行"
    echo "4. 今後の更新: dev-workflow.bat を使用"
    echo.
    echo "📋 Netlifyデプロイ設定:"
    echo "- Repository: https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2"
    echo "- Build command: npm run build"
    echo "- Publish directory: dist"
    echo "- Node version: 18"
    echo.
    echo "🎨 特徴的な新機能:"
    echo "- 韓国ミニマル × カシミア × フィットタートル"
    echo "- Y2K × クロップトップ × テクニカル素材"
    echo "- サステナブル × オーガニックコットン × Aライン"
    echo "- インディースリーズ × ダメージデニム × スキニー"
) else (
    echo "❌ プッシュ中にエラーが発生しました。"
    echo.
    echo "🔐 認証が必要な可能性があります："
    echo "1. GitHubにログインしているか確認"
    echo "2. Personal Access Token が必要な場合:"
    echo "   - GitHub > Settings > Developer settings > Personal access tokens"
    echo "   - Generate new token (classic)"
    echo "   - Select 'repo' scope"
    echo "   - パスワード入力時にトークンを使用"
    echo.
    echo "🌐 ブラウザで確認:"
    echo "https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2"
    echo.
    echo "💬 それでも問題が解決しない場合は、エラーメッセージをお知らせください。"
)

echo.
echo "🎯 プロジェクト概要:"
echo "素材（ニット・デニム・Tシャツ）×シルエット×トレンド（韓国風・Y2K等）"
echo "の組み合わせでファッションプロンプトを生成する次世代ツール"
echo.
pause
