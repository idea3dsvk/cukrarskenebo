#!/bin/bash

# 🚀 Git Deployment Script pre Cukrárske Nebo
# Tento script automatizuje proces nasadenia na GitHub

echo "🍰 Pripravujem Cukrárske Nebo na nasadenie..."

# Farby pre output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funkcie
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Kontrola Git repozitára
if [ ! -d ".git" ]; then
    print_error "Nie ste v Git repozitári! Inicializujte Git najprv."
    echo "git init"
    echo "git remote add origin https://github.com/[USERNAME]/cukrarske-nebo.git"
    exit 1
fi

# Kontrola staging area
if [ -z "$(git status --porcelain)" ]; then
    print_warning "Žiadne zmeny na commit."
else
    print_info "Staging všetky súbory..."
    git add .
fi

# Commit message
echo ""
read -p "📝 Zadajte commit message (Enter pre default): " commit_message

if [ -z "$commit_message" ]; then
    commit_message="feat: Update Cukrarske Nebo e-commerce site

- Product updates and improvements  
- UI/UX enhancements
- Bug fixes and optimizations"
fi

# Commit
print_info "Committujem zmeny..."
git commit -m "$commit_message"

# Push
print_info "Pushnem zmeny na GitHub..."
git push origin main

# Kontrola GitHub Pages URL
print_success "Deployment dokončený!"
echo ""
print_info "Vaša stránka bude dostupná na:"
echo "🌐 https://[USERNAME].github.io/cukrarske-nebo/"
echo ""
print_info "GitHub Actions automaticky nasadia stránku za 2-3 minúty."
print_info "Môžete sledovať progress na: https://github.com/[USERNAME]/cukrarske-nebo/actions"

echo ""
print_warning "NEZABUDNITE:"
echo "1. Aktualizovať EmailJS konfiguráciu v src/config/email.config.ts"
echo "2. Otestovať všetky funkcie po nasadení"
echo "3. Skontrolovať admin panel a email funkcionalitu"

echo ""
print_success "🎉 Deployment dokončený úspešne!"