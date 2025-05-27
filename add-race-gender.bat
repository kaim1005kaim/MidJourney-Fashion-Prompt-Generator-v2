@echo off
echo === Adding Race and Gender Settings ===

D:
cd D:\development\MidJourney-Fashion-Prompt-Generator-main

git add .
git commit -m "Add race and gender selection features

- Add ethnicity options: Caucasian, African American, Asian, Random
- Add gender options: Male, Female, Random  
- Update AppSettings interface with new fields
- Add UI controls in SettingsPanel for race/gender selection
- Integrate race/gender into prompt generation logic
- Support random selection for both race and gender
- Update default values and options in dataService"

git push origin main

echo === PUSHED! ===
echo New features:
echo - Settings panel now includes race and gender options
echo - Prompts will include selected race/gender information
echo - Random option available for both settings
echo Check https://mfpg-nomal.netlify.app/ in 2-3 minutes!

pause