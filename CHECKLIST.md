# ✅ KONTROLNÝ ZOZNAM PRE NASADENIE

Pred nasadením na GitHub skontrolujte všetky položky:

## 📋 Preddeployment Checklist

### 1. EmailJS konfigurácia

- [x] **Service ID**: `service_qghioic` ✅
- [x] **Template ID**: `template_objednavka` ✅
- [x] **Public Key**: `Wu5TEgUdMsFc_tOI0` ✅
- [x] **Shop Email**: `cukrarskenebo@gmail.com` ✅

### 2. Súbory projektu

- [x] **index.html** - hlavná stránka ✅
- [x] **404.html** - SPA routing fallback ✅
- [x] **.nojekyll** - GitHub Pages konfigurácia ✅
- [x] **README.md** - kompletná dokumentácia ✅
- [x] **LICENSE** - MIT licencia ✅
- [x] **.gitignore** - ignorovanie nepotrebných súborov ✅

### 3. GitHub Actions

- [x] **.github/workflows/deploy.yml** - automatické nasadenie ✅

### 4. Dokumentácia

- [x] **EMAILJS_SETUP.md** - návod na EmailJS ✅
- [x] **DEPLOYMENT.md** - návod na nasadenie ✅
- [x] **CONTRIBUTING.md** - pravidlá pre contributors ✅
- [x] **CHANGELOG.md** - história zmien ✅
- [x] **CHECKLIST.md** - tento súbor ✅

### 5. Deployment skripty

- [x] **deploy.sh** - Bash script pre Linux/Mac ✅
- [x] **deploy.ps1** - PowerShell script pre Windows ✅

## 🧪 Funkčné testovanie

### Základné funkcie

- [ ] Načítanie stránky bez errors
- [ ] Responzívny dizajn na mobile/tablet/desktop
- [ ] Vyhľadávanie produktov funguje
- [ ] Filtrovanie podľa kategórií
- [ ] Stránkovanie produktov
- [ ] Pridávanie produktov do košíka
- [ ] Úprava množstva v košíku
- [ ] Odoberanie z košíka
- [ ] Checkout formulár validácia

### Admin panel

- [ ] Prihlásenie cez logo + heslo admin123
- [ ] Úprava názvu produktu
- [ ] Úprava ceny produktu
- [ ] Úprava kategórie produktu
- [ ] Upload obrázka (drag & drop)
- [ ] Upload obrázka (tlačidlo browse)
- [ ] Uloženie zmien produktu
- [ ] Test email funkcionalita

### EmailJS integrácia

- [ ] Vyplnenie objednávky
- [ ] Odoslanie objednávky
- [ ] Zobrazenie potvrdenia s číslom objednávky
- [ ] Email dorazil na `cukrarskenebo@gmail.com`
- [ ] Email obsahuje všetky potrebné informácie
- [ ] HTML formátovanie v emaili je správne

## 🚀 Deployment kroky

### 1. Príprava GitHub repozitára

```bash
# Vytvorte nový repozitár na github.com
# Názov: cukrarske-nebo
# Public repozitár s README, .gitignore (Node), MIT License
```

### 2. Klonujte a pridajte súbory

```bash
git clone https://github.com/[USERNAME]/cukrarske-nebo.git
cd cukrarske-nebo

# Skopírujte všetky súbory z "cukrárske-nebo Final" do repozitára
# (okrem .git priečinka ak existuje)
```

### 3. Initial commit

```bash
git add .
git commit -m "feat: Initial commit - Complete Cukrarske Nebo e-commerce site

- Angular 20 frontend with Tailwind CSS
- Product catalog with 11 categories (108+ products)
- Shopping cart with checkout process
- Admin panel with image upload functionality
- EmailJS integration for order emails
- LocalStorage persistence for products and images
- Responsive design with modern UI/UX
- GitHub Pages deployment ready"

git push origin main
```

### 4. GitHub Pages nastavenie

1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: main / (root)
4. **Save**

### 5. Sledovanie deploymenta

1. **Actions** tab - sledovanie GitHub Actions
2. Po dokončení bude stránka dostupná na:
   `https://[USERNAME].github.io/cukrarske-nebo/`

## 🔧 Post-deployment testovanie

### Produkčné testovanie

- [ ] Stránka sa načíta bez 404 errors
- [ ] HTTPS certifikát funguje
- [ ] Všetky obrázky sa načítavajú
- [ ] Admin panel je funkčný
- [ ] EmailJS odosiela skutočné emaily
- [ ] LocalStorage perzistencia funguje
- [ ] Mobile responsiveness

### Performance kontrola

- [ ] PageSpeed Insights test
- [ ] Lighthouse audit (90+ score)
- [ ] Console bez kritických errors
- [ ] Network tab - rozumné loading times

## 📞 Podpora a údržba

### Monitoring

- **GitHub Actions** - automatické deploymenty
- **EmailJS Dashboard** - email štatistiky
- **GitHub Insights** - traffic a usage

### Pravidelná údržba

- **Mesačne**: Kontrola EmailJS limitov
- **Štvrťročne**: Aktualizácia závislostí
- **Polročne**: Security audit

## 🎯 Ďalšie kroky po nasadení

1. **Aktualizujte README.md** s live URL
2. **Zdieľajte link** s potenciálnymi používateľmi
3. **Zbierajte feedback** a pridajte do Issues
4. **Monitorujte analýzy** a optimalizujte
5. **Plánujte ďalšie funkcie** podľa CHANGELOG.md

---

## ✅ DEPLOYMENT READY!

Ak máte všetky položky označené ✅, váš projekt je pripravený na nasadenie na GitHub Pages!

**Live URL**: `https://[USERNAME].github.io/cukrarske-nebo/`

**Happy coding! 🍰✨**
