# 🚀 Nasadenie Cukrárske Nebo na GitHub Pages

Kompletný návod na nasadenie aplikácie na GitHub Pages s automatickým deployment.

## 📋 Pred nasadením

### 1. Skontrolujte konfiguráciu

```typescript
// src/config/email.config.ts
export const EMAIL_CONFIG = {
  SERVICE_ID: "service_qghioic",
  TEMPLATE_ID: "template_objednavka",
  PUBLIC_KEY: "VÁŠ_SKUTOČNÝ_PUBLIC_KEY", // ⚠️ AKTUALIZUJTE
  SHOP_EMAIL: "vas@email.com", // ⚠️ AKTUALIZUJTE
};
```

### 2. Testujte lokálne

```bash
npx http-server -p 3000
```

- Otestujte všetky funkcie
- Skontrolujte admin panel
- Overte EmailJS funkcionalitu

## 🔧 Nastavenie GitHub repozitára

### 1. Vytvorte nový repozitár

1. Choďte na [GitHub.com](https://github.com)
2. Kliknite "New repository"
3. **Repository name**: `cukrarske-nebo`
4. **Description**: `Moderná e-commerce stránka pre cukrárske ozdoby`
5. ✅ Public
6. ✅ Add README file
7. ✅ Add .gitignore (Node)
8. ✅ Choose license (MIT)

### 2. Klonujte repozitár

```bash
git clone https://github.com/[USERNAME]/cukrarske-nebo.git
cd cukrarske-nebo
```

### 3. Pridajte súbory projektu

```bash
# Skopírujte všetky súbory z 'cukrárske-nebo Final' do nového repozitára
cp -r "path/to/cukrárske-nebo Final/"* .

# Alebo cez Windows File Explorer
```

### 4. Commitnite zmeny

```bash
git add .
git commit -m "feat: Initial commit - Complete Cukrarske Nebo e-commerce site

- Angular 20 frontend with Tailwind CSS
- Product catalog with categories and search
- Shopping cart with checkout process
- Admin panel with image upload
- EmailJS integration for orders
- LocalStorage persistence
- Responsive design with modern UI/UX"

git push origin main
```

## 🌐 Konfigurácia GitHub Pages

### 1. Povoľte GitHub Pages

1. Choďte do **Settings** vášho repozitára
2. Scroll down na **Pages** sekciu
3. **Source**: Deploy from a branch
4. **Branch**: `main`
5. **Folder**: `/ (root)`
6. Kliknite **Save**

### 2. Konfigurácia pre Angular aplikáciu

Vytvorte `.nojekyll` súbor:

```bash
touch .nojekyll
echo "# Disable Jekyll processing" > .nojekyll
git add .nojekyll
git commit -m "chore: Add .nojekyll for GitHub Pages"
git push origin main
```

### 3. Aktualizujte base href (voliteľne)

Ak chcete aplikáciu spustiť v podpriečinku:

```html
<!-- index.html -->
<base href="/cukrarske-nebo/" />
```

## 🤖 Automatické nasadenie (GitHub Actions)

### 1. Workflow je už pripravený

Súbor `.github/workflows/deploy.yml` automaticky:

- Spustí sa pri každom push na `main`
- Uploaduje súbory na GitHub Pages
- Nasadí aplikáciu

### 2. Skontrolujte deployment

1. Choďte do **Actions** tabu
2. Sledujte progress deploymenta
3. Po dokončení bude stránka dostupná na:

```
https://[USERNAME].github.io/cukrarske-nebo/
```

## 📱 Testovanie po nasadení

### 1. Základné funkcie

- ✅ Načítanie stránky
- ✅ Responzívny dizajn
- ✅ Navigácia medzi kategóriami
- ✅ Vyhľadávanie produktov
- ✅ Pridávanie do košíka

### 2. Admin panel

- ✅ Prihlásenie (heslo: admin123)
- ✅ Úprava produktov
- ✅ Upload obrázkov
- ✅ Test emailu

### 3. EmailJS funkcionalita

```javascript
// Otvorte Developer Console a testujte:
console.log(window.emailjs); // Mal by existovať
```

## 🔧 Riešenie problémov

### 404 Page Not Found

```bash
# Vytvorte 404.html súbor pre SPA routing
cp index.html 404.html
git add 404.html
git commit -m "fix: Add 404.html for GitHub Pages SPA routing"
git push origin main
```

### CORS chyby s EmailJS

- Overte, že Public Key je správne nastavený
- Skontrolujte EmailJS domény v nastaveniach účtu

### Obrázky sa nenačítavajú

```javascript
// Skontrolujte v konzole:
// Network tab - hľadajte 404 errors pre obrázky
```

### LocalStorage nefunguje

- GitHub Pages má HTTPS, čo môže ovplyvniť localStorage
- Testujte v incognito mode

## 🎯 Produkčné vylepšenia

### 1. Custom doména (voliteľné)

1. Kúpte doménu (napr. `cukrarske-nebo.sk`)
2. V GitHub Pages settings pridajte **Custom domain**
3. Konfiguračný súbor CNAME:

```bash
echo "cukrarske-nebo.sk" > CNAME
git add CNAME
git commit -m "feat: Add custom domain"
git push origin main
```

### 2. Performance optimalizácia

```html
<!-- Pridajte do index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="dns-prefetch" href="https://picsum.photos" />
```

### 3. Analytics (voliteľné)

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### 4. SEO vylepšenia

```html
<!-- Pridajte do <head> -->
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://[USERNAME].github.io/cukrarske-nebo/" />
<meta
  property="og:url"
  content="https://[USERNAME].github.io/cukrarske-nebo/"
/>
```

## 📊 Monitoring a údržba

### 1. GitHub Insights

- **Traffic** - návštevnosť stránky
- **Actions** - deployment história
- **Issues** - bug reporty od používateľov

### 2. EmailJS Dashboard

- Monitorujte počet odoslaných emailov
- Skontrolujte rate limiting
- Sledujte chybové hlásenia

### 3. Pravidelné aktualizácie

```bash
# Mesačne aktualizujte závislosti
git pull origin main
# Testujte lokálne
# Push zmeny
git push origin main
```

## 🔐 Bezpečnosť

### 1. EmailJS Public Key

- Public Key je bezpečný pre frontend
- Nikdy nevystavujte Private Key
- Nastavte rate limiting v EmailJS

### 2. GitHub Secrets

Pre citlivé dáta používajte GitHub Secrets:

1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**

### 3. Regular updates

```bash
# Sledujte security alerts na GitHube
# Aktualizujte dependencies pravidelne
```

---

## 🎉 Hotovo!

Vaša aplikácia je teraz live na:
**https://[USERNAME].github.io/cukrarske-nebo/**

### Ďalšie kroky:

1. **Aktualizujte EmailJS konfiguráciu**
2. **Testujte všetky funkcie**
3. **Zdieľajte link s používateľmi**
4. **Sledujte feedback a vylepšujte**

**Gratulujeme k úspešnému nasadeniu! 🎊**
