@echo off
echo "=== 開発 → コミット → プッシュ ワークフロー ==="
echo.

REM 現在の状態確認
echo "📋 現在のGit状態:"
git status --short
echo.

REM 変更ファイルがあるかチェック
git diff --quiet
if %ERRORLEVEL% NEQ 0 (
    echo "🔄 変更が検出されました。続行しますか？ [Y/n]"
    set /p CONTINUE=""
    if /i "%CONTINUE%"=="n" (
        echo "操作をキャンセルしました。"
        pause
        exit /b 0
    )
) else (
    echo "ℹ️  変更ファイルはありません。"
    echo "新しい変更を行ってから再実行してください。"
    pause
    exit /b 0
)

REM ビルドテスト（オプション）
echo "🏗️  ビルドテストを実行しますか？ [Y/n]"
set /p BUILD_TEST=""
if /i "%BUILD_TEST%" NEQ "n" (
    echo "ビルドテスト実行中..."
    npm run build
    if %ERRORLEVEL% NEQ 0 (
        echo "❌ ビルドエラーが発生しました。修正してから再度お試しください。"
        pause
        exit /b 1
    )
    echo "✅ ビルド成功"
    echo.
)

REM コミットメッセージ入力
echo "📝 コミットメッセージを入力してください:"
echo "例: feat: 新機能追加, fix: バグ修正, update: 機能改善, docs: ドキュメント更新"
set /p COMMIT_MSG=""

if "%COMMIT_MSG%"=="" (
    echo "❌ コミットメッセージが必要です。"
    pause
    exit /b 1
)

REM ファイルをステージング
echo "📦 変更ファイルをステージング中..."
git add .
echo.

REM コミット実行
echo "💾 コミット実行中: %COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% NEQ 0 (
    echo "❌ コミットに失敗しました。"
    pause
    exit /b 1
)
echo.

REM プッシュ実行
echo "🚀 GitHubにプッシュ中..."
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo "❌ プッシュに失敗しました。ネットワーク接続や認証情報を確認してください。"
    pause
    exit /b 1
)

echo "✅ 正常に完了しました！"
echo.
echo "🌐 変更内容を確認:"
echo "- GitHub: https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2"
echo "- Netlify: 自動デプロイが開始されます（設定済みの場合）"
echo.

echo "📈 次のアクション（オプション）:"
echo "1. [D] 開発サーバー起動 (npm run dev)"
echo "2. [B] ブラウザでGitHubを開く"
echo "3. [Enter] 終了"
echo.
set /p NEXT_ACTION=""

if /i "%NEXT_ACTION%"=="d" (
    echo "開発サーバーを起動中..."
    start cmd /k "npm run dev"
) else if /i "%NEXT_ACTION%"=="b" (
    echo "ブラウザでGitHubを開いています..."
    start https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2
)

echo.
pause
