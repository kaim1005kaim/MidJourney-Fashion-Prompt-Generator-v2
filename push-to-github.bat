@echo off
echo "=== MidJourney Fashion Prompt Generator v2.0 GitHub Push ==="
echo.

REM Git初期化（既に存在する場合はスキップ）
if not exist .git (
    echo "Git初期化中..."
    git init
    echo.
)

echo "ファイルをステージング中..."
git add .
echo.

echo "コミットメッセージを入力してください（空の場合はデフォルトメッセージを使用）:"
set /p COMMIT_MSG=""

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG="feat: 要素ベースファッションプロンプト生成システム v2.0 - 素材・シルエット・トレンド組み合わせに対応"
)

echo "コミット中: %COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
echo.

echo "リモートリポジトリのURLを入力してください（例: https://github.com/username/repo.git）:"
set /p REMOTE_URL=""

if "%REMOTE_URL%"=="" (
    echo "❌ リモートリポジトリのURLが必要です。"
    pause
    exit /b 1
)

REM リモート追加（既に存在する場合は更新）
git remote remove origin 2>nul
git remote add origin %REMOTE_URL%
echo.

echo "ブランチ名を入力してください（デフォルト: main）:"
set /p BRANCH=""

if "%BRANCH%"=="" (
    set BRANCH=main
)

echo "GitHubにプッシュ中..."
git branch -M %BRANCH%
git push -u origin %BRANCH%
echo.

if %ERRORLEVEL% EQU 0 (
    echo "✅ 正常にGitHubにプッシュされました！"
    echo.
    echo "次のステップ:"
    echo "1. GitHubリポジトリページでコードを確認"
    echo "2. Netlifyでリポジトリを連携"
    echo "3. 自動デプロイ設定を完了"
    echo.
    echo "Netlifyデプロイ設定:"
    echo "- Build command: npm run build"
    echo "- Publish directory: dist"
    echo "- Node version: 18"
) else (
    echo "❌ プッシュ中にエラーが発生しました。"
    echo "認証情報やリポジトリURLを確認してください。"
)

echo.
pause
