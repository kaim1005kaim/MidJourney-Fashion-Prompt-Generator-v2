@echo off
echo MidJourney Fashion Prompt Generator - Git Push Script
echo.

echo 1. 現在の状況を確認中...
git status

echo.
echo 2. すべての変更をステージングに追加...
git add .

echo.
echo 3. コミットを作成...
git commit -m "Fix database management and percentage calculation

- Fix percentage calculation error (5250%% -> correct values)
- Simplify database service by removing unnecessary chunk system
- Implement single batch data loading for better performance
- Improve error handling with fallback data
- Simplify DatabaseManager and DatabaseStatus components
- Add backup files for rollback safety"

echo.
echo 4. リモートリポジトリにプッシュ...
git push origin main

echo.
echo Push完了! Netlifyで自動デプロイが開始されます。
echo 数分後に https://mfpg-nomal.netlify.app/ で確認してください。

pause