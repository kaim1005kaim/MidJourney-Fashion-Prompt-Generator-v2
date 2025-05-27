#!/bin/bash
echo "=== MidJourney Fashion Prompt Generator - Git Push ==="
echo "現在のディレクトリ: $(pwd)"

# Dドライブに移動
cd /d/development/MidJourney-Fashion-Prompt-Generator-main 2>/dev/null || cd /mnt/d/development/MidJourney-Fashion-Prompt-Generator-main 2>/dev/null || {
    echo "Dドライブのパスが見つかりません。手動で移動してください："
    echo "cd D:\\development\\MidJourney-Fashion-Prompt-Generator-main"
    exit 1
}

echo "移動後のディレクトリ: $(pwd)"

# Git status確認
echo "=== Git Status ==="
git status

# 変更をadd
echo "=== Adding changes ==="
git add .

# コミット
echo "=== Committing changes ==="
git commit -m "Fix era filtering: prevent fallback and add debug logging

- Remove fallback to all brands when no filtered brands found
- Add comprehensive console logging for filter debugging  
- Improve parseBrandYear function for various date formats
- Add detailed brand matching logs
- Ensure only selected era brands are used for prompt generation"

# プッシュ
echo "=== Pushing to origin ==="
git push origin main

echo "=== Complete! ==="