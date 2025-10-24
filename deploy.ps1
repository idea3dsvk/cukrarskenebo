# 🚀 PowerShell Deployment Script pre Cukrárske Nebo
# Tento script automatizuje proces nasadenia na GitHub

Write-Host "🍰 Pripravujem Cukrárske Nebo na nasadenie..." -ForegroundColor Cyan

# Kontrola Git repozitára
if (!(Test-Path ".git")) {
    Write-Host "❌ Nie ste v Git repozitári! Inicializujte Git najprv." -ForegroundColor Red
    Write-Host "git init" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/[USERNAME]/cukrarske-nebo.git" -ForegroundColor Yellow
    exit 1
}

# Kontrola staging area
$status = git status --porcelain
if ([string]::IsNullOrEmpty($status)) {
    Write-Host "⚠️ Žiadne zmeny na commit." -ForegroundColor Yellow
} else {
    Write-Host "ℹ️ Staging všetky súbory..." -ForegroundColor Blue
    git add .
}

# Commit message
Write-Host ""
$commitMessage = Read-Host "📝 Zadajte commit message (Enter pre default)"

if ([string]::IsNullOrEmpty($commitMessage)) {
    $commitMessage = @"
feat: Update Cukrarske Nebo e-commerce site

- Product updates and improvements  
- UI/UX enhancements
- Bug fixes and optimizations
"@
}

# Commit
Write-Host "ℹ️ Committujem zmeny..." -ForegroundColor Blue
git commit -m $commitMessage

# Push
Write-Host "ℹ️ Pushnem zmeny na GitHub..." -ForegroundColor Blue
git push origin main

# Success message
Write-Host ""
Write-Host "✅ Deployment dokončený!" -ForegroundColor Green
Write-Host ""
Write-Host "ℹ️ Vaša stránka bude dostupná na:" -ForegroundColor Blue
Write-Host "🌐 https://[USERNAME].github.io/cukrarske-nebo/" -ForegroundColor Cyan
Write-Host ""
Write-Host "ℹ️ GitHub Actions automaticky nasadia stránku za 2-3 minúty." -ForegroundColor Blue
Write-Host "ℹ️ Môžete sledovať progress na: https://github.com/[USERNAME]/cukrarske-nebo/actions" -ForegroundColor Blue

Write-Host ""
Write-Host "⚠️ NEZABUDNITE:" -ForegroundColor Yellow
Write-Host "1. Aktualizovať EmailJS konfiguráciu v src/config/email.config.ts"
Write-Host "2. Otestovať všetky funkcie po nasadení"  
Write-Host "3. Skontrolovať admin panel a email funkcionalitu"

Write-Host ""
Write-Host "🎉 Deployment dokončený úspešne!" -ForegroundColor Green

# Pause na konci
Write-Host ""
Write-Host "Stlačte Enter pre ukončenie..."
Read-Host