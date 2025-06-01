@echo off
echo "=== MidJourney Fashion Prompt Generator v2.0 完全セットアップ ==="
echo.

echo "👋 kai.moriguchi1005@gmail.com さん、こんにちは！"
echo "🎨 要素ベースファッションプロンプト生成システムのセットアップを開始します"
echo.

REM Node.js確認
echo "1️⃣  開発環境チェック中..."
echo "Node.js バージョン:"
node --version
if %ERRORLEVEL% NEQ 0 (
    echo "❌ Node.js がインストールされていません。"
    echo "https://nodejs.org からダウンロードしてインストールしてください。"
    pause
    exit /b 1
)

echo "npm バージョン:"
npm --version
echo.

REM 依存関係インストール
echo "2️⃣  依存関係インストール中..."
npm install
if %ERRORLEVEL% NEQ 0 (
    echo "❌ 依存関係のインストールに失敗しました。"
    pause
    exit /b 1
)
echo "✅ 依存関係インストール完了"
echo.

REM TypeScriptコンパイルチェック
echo "3️⃣  TypeScript コンパイルチェック..."
npx tsc --noEmit
if %ERRORLEVEL% EQU 0 (
    echo "✅ TypeScript コンパイル成功"
) else (
    echo "⚠️  TypeScript コンパイル警告/エラーがあります（動作には影響しない可能性があります）"
)
echo.

REM ビルドテスト
echo "4️⃣  プロダクションビルドテスト..."
npm run build
if %ERRORLEVEL% EQU 0 (
    echo "✅ プロダクションビルド成功"
) else (
    echo "❌ プロダクションビルドに失敗しました。"
    pause
    exit /b 1
)
echo.

REM Git設定とGitHubリンク
echo "5️⃣  GitHubリポジトリとリンク中..."
call setup-complete.bat
echo.

echo "🎉 セットアップ完了！"
echo.
echo "🚀 利用可能なコマンド:"
echo "- start-dev.bat        : 開発サーバー起動"
echo "- dev-workflow.bat     : 開発→コミット→プッシュ ワークフロー"
echo "- npm run build        : プロダクションビルド"
echo "- npm run dev          : 開発サーバー起動（手動）"
echo.

echo "🎯 プロジェクトの特徴:"
echo "✨ 要素ベース生成システム"
echo "  - 素材: ニット（カシミア、ウール）、デニム、Tシャツ"
echo "  - シルエット: オーバーサイズ、フィット、クロップド"
echo "  - トレンド: 韓国ミニマル、Y2K、テックウェア"
echo.
echo "🧠 高度な機能"
echo "  - 互換性チェック（要素の相性判定）"
echo "  - 季節的一貫性（季節に適した組み合わせ）"
echo "  - 創造性レベル調整（保守的〜実験的）"
echo "  - カラーハーモニー（調和の取れた色選択）"
echo.

echo "📱 次にやること:"
echo "1. [D] 開発サーバーを起動してローカルでテスト"
echo "2. [N] Netlifyでデプロイ設定"
echo "3. [G] GitHubページを開いて確認"
echo "4. [Enter] 終了"
echo.
set /p NEXT=""

if /i "%NEXT%"=="d" (
    echo "🚀 開発サーバーを起動中..."
    echo "ブラウザで http://localhost:5173 にアクセスしてください"
    npm run dev
) else if /i "%NEXT%"=="n" (
    echo "🌐 Netlifyデプロイ手順:"
    echo "1. https://netlify.com にアクセス"
    echo "2. 'New site from Git' をクリック"
    echo "3. GitHub連携でリポジトリを選択:"
    echo "   https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2"
    echo "4. ビルド設定:"
    echo "   - Build command: npm run build"
    echo "   - Publish directory: dist"
    echo.
    start https://netlify.com
) else if /i "%NEXT%"=="g" (
    echo "📂 GitHubリポジトリを開いています..."
    start https://github.com/kaim1005kaim/MidJourney-Fashion-Prompt-Generator-v2
)

echo.
echo "🎨 Happy Coding! ファッションの新しい可能性を探求しましょう ✨"
pause
