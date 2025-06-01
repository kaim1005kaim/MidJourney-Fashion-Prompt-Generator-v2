@echo off
echo "=== MidJourney Fashion Prompt Generator v2.0 開発環境チェック ==="
echo.

echo "Node.js バージョン確認:"
node --version
echo.

echo "npm バージョン確認:"
npm --version
echo.

echo "依存関係のインストール:"
npm install
echo.

echo "TypeScriptコンパイルチェック:"
npx tsc --noEmit
echo.

if %ERRORLEVEL% EQU 0 (
    echo "✅ TypeScriptコンパイルエラーなし"
) else (
    echo "❌ TypeScriptコンパイルエラーが発生しました"
)
echo.

echo "開発サーバー起動中..."
echo "ブラウザで http://localhost:5173 にアクセスしてください"
echo "終了するには Ctrl+C を押してください"
echo.

npm run dev

pause
