@echo off
echo === MidJourney Fashion Prompt Generator - Git Push ===
echo 現在のディレクトリ: %CD%

REM Dドライブに移動
D:
cd D:\development\MidJourney-Fashion-Prompt-Generator-main

echo 移動後のディレクトリ: %CD%

REM Git status確認
echo === Git Status ===
git status

if errorlevel 1 (
    echo ERROR: Gitリポジトリが見つかりません
    pause
    exit /b 1
)

REM 変更をadd
echo === Adding changes ===
git add .

REM コミット
echo === Committing changes ===
git commit -m "Fix era filtering: prevent fallback and add debug logging" -m "- Remove fallback to all brands when no filtered brands found" -m "- Add comprehensive console logging for filter debugging" -m "- Improve parseBrandYear function for various date formats" -m "- Add detailed brand matching logs" -m "- Ensure only selected era brands are used for prompt generation"

REM プッシュ
echo === Pushing to origin ===
git push origin main

echo === Complete! ===
echo.
echo 数分後に https://mfpg-nomal.netlify.app/ で確認してください
echo F12でコンソールを開いてデバッグ情報を確認してください

pause