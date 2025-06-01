@echo off
echo "=== GitHub リポジトリとローカルプロジェクトのリンク ==="
echo.

REM 現在のディレクトリを確認
echo "現在のディレクトリ: %CD%"
echo.

REM Git初期化（既に存在する場合はスキップ）
if not exist .git (
    echo "Git初期化中..."
    git init
    echo.
) else (
    echo "Gitリポジトリは既に初期化されています"
    echo.
)

REM 既存のリモートを削除（存在する場合）
echo "既存のリモート設定をクリア中..."
git remote remove origin 2>nul
echo.

REM 新しいリモートリポジトリを追加
echo "GitHubリポジトリをリモートとして追加中..."
git remote add origin https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2.git
echo.

REM リモート設定確認
echo "リモート設定確認:"
git remote -v
echo.

REM ファイルをステージング
echo "すべてのファイルをステージング中..."
git add .
echo.

REM コミット作成
echo "初期コミット作成中..."
git commit -m "feat: 要素ベースファッションプロンプト生成システム v2.0

- 素材・シルエット・トレンドの組み合わせ生成システム
- 韓国ミニマル、Y2K、テックウェア等の最新トレンド対応
- 互換性チェック機能
- 季節的一貫性とカラーハーモニー考慮
- 創造性レベル調整機能
- 人気の組み合わせテンプレート

主要素材: ニット（カシミア、ウール、コットン）、デニム、Tシャツ素材
主要シルエット: オーバーサイズ、フィット、クロップド等
主要トレンド: 韓国風、Y2K、サステナブル、インディースリーズ等"
echo.

REM ブランチを main に設定
echo "メインブランチを設定中..."
git branch -M main
echo.

REM GitHub からの既存ファイルをプル（READMEなどがある場合）
echo "GitHubからの既存ファイルを統合中..."
git pull origin main --allow-unrelated-histories --no-edit
echo.

REM プッシュ実行
echo "GitHubにプッシュ中..."
git push -u origin main
echo.

if %ERRORLEVEL% EQU 0 (
    echo "✅ 正常にGitHubリポジトリとリンクされました！"
    echo.
    echo "🎉 次のステップ:"
    echo "1. ブラウザで https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2 を開いて確認"
    echo "2. Netlifyでこのリポジトリを連携してデプロイ"
    echo "3. 開発を続ける場合は start-dev.bat を実行"
    echo.
    echo "📋 Netlifyデプロイ設定:"
    echo "- Repository: https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2"
    echo "- Build command: npm run build"
    echo "- Publish directory: dist"
    echo "- Node version: 18"
) else (
    echo "❌ プッシュ中にエラーが発生しました。"
    echo "認証情報を確認してください。"
    echo.
    echo "💡 トラブルシューティング:"
    echo "1. GitHub認証: git config --global user.name 'your-username'"
    echo "2. GitHub認証: git config --global user.email 'your-email@example.com'"
    echo "3. Personal Access Token が必要な場合があります"
)

echo.
pause
