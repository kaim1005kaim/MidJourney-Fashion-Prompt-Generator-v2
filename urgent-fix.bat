@echo off
echo === URGENT FIX: Era Filter ===

D:
cd D:\development\MidJourney-Fashion-Prompt-Generator-main

git add .
git commit -m "URGENT: Fix era filtering - exclude brands before 1980

- Add strict filter to exclude brands starting before 1980
- Improve overlap detection logic for brand era matching  
- Add better debug logging with limited output
- Prevent old era brands (1970s, 1910s) from appearing in filtered results"

git push origin main

echo === PUSHED! ===
echo Check https://mfpg-nomal.netlify.app/ in 2-3 minutes
echo Open F12 console to see improved debug info
pause