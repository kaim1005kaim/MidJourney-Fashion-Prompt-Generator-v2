@echo off
echo Era Filter Debug - Git Commit Script

echo コミット中...
git add .
git commit -m "Debug and fix era filtering logic

- Add detailed console logging for filter debugging
- Improve brand year parsing with parseBrandYear function  
- Ensure filtered brands are actually used (no fallback to all brands)
- Add comprehensive filter result logging
- Fix year parsing for various brand data formats"

echo プッシュ中...
git push origin main

echo 完了！ライブサイトで年代フィルターのデバッグ情報を確認してください。
echo ブラウザの開発者ツール（F12）でコンソールを開いてプロンプト生成をテストしてください。

pause