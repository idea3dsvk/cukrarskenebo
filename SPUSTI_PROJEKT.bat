@echo off
echo ========================================
echo    OBNOVENIE PROJEKTU CUKRARSKE NEBO
echo ========================================
echo.

REM Kontrola existencie súborov
if not exist "index.html" (
    echo CHYBA: index.html sa nenašiel!
    echo Uistite sa, že ste v správnom priečinku.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo CHYBA: package.json sa nenašiel!
    echo Projekt nie je úplný.
    pause
    exit /b 1
)

echo ✅ Súbory projektu nájdené
echo.

echo 📦 Spúšťam lokálny server...
echo 🌐 Server bude dostupný na: http://localhost:3000
echo 🛑 Pre zastavenie stlačte CTRL+C
echo.

REM Spustenie servera
npx http-server -p 3000 -c-1

echo.
echo Server bol zastavený.
pause