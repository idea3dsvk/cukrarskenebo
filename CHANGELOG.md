# Changelog

Všetky významné zmeny v projekte Cukrárske Nebo budú dokumentované v tomto súbore.

Formát je založený na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
a projekt dodržiava [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-10-24

### Pridané ✨

- **Kompletný e-commerce systém** pre cukrárske ozdoby
- **Angular 20** frontend s moderným dizajnom
- **Responzívny UI/UX** s Tailwind CSS
- **Produktový katalóg** s 11 kategóriami (108+ produktov)
- **Vyhľadávanie a filtrovanie** produktov v reálnom čase
- **Nákupný košík** s možnosťou úpravy množstva
- **Checkout proces** s formulárom na objednávku
- **Admin panel** pre správu produktov
- **Image upload** funkcionalita s drag & drop
- **EmailJS integrácia** pre automatické odosielanie objednávok
- **LocalStorage perzistencia** pre produkty a nahraté obrázky
- **Stránkovanie** pre lepšiu navigáciu
- **Loading states** a error handling
- **Accessibility** vylepšenia (ARIA labels, keyboard navigation)
- **SEO optimalizácia** (meta tags, Open Graph, Twitter Cards)

### Kategórie produktov 📋

- 🏷️ **Meno** - personalizované nápisy a zápichi (9 produktov)
- 🔢 **Meno + číslo** - kombinované dekorácie (9 produktov)
- 🎭 **Figúrky** - jedlé postavičky a objekty (9 produktov)
- #️⃣ **Číslo** - číselné dekorácie (9 produktov)
- 🖼️ **Obrázok** - jedlé obrázky a fotky (9 produktov)
- 🏢 **Logo** - firemné a značkové dekorácie (9 produktov)
- 🦊 **Zvieratá** - zvieracie motívy (9 produktov)
- ⛪ **Krst** - náboženské motívy (9 produktov)
- 💒 **Svadba** - svadobné dekorácie (9 produktov)
- 💕 **Láska** - romantické motívy (9 produktov)
- 👨‍⚕️ **Povolanie/Hobby** - tematické dekorácie (12 produktov)

### Technické špecifikácie 🛠️

- **Frontend**: Angular 20 standalone komponenty
- **Styling**: Tailwind CSS utility classes
- **State Management**: RxJS Signals
- **Type Safety**: TypeScript 5.8.2
- **Image Optimization**: NgOptimizedImage directive
- **Email Service**: EmailJS s Service ID `service_qghioic`
- **Persistence**: Browser LocalStorage
- **Deployment**: GitHub Pages s automatickým CI/CD

### Bezpečnosť 🔐

- Implementované input validácie
- XSS ochrana cez Angular sanitization
- CSRF ochrana cez Angular built-in mechanizmy
- Rate limiting recommendations pre EmailJS
- Secure localStorage handling

### Administrácia 👤

- **Prihlásenie**: Klik na logo + heslo `admin123`
- **Funkcie**: Úprava produktov, upload obrázkov, test emailov
- **Debug nástroje**: Reset produktov, console logging
- **Image management**: Podporované formáty JPG, PNG, GIF, WEBP (max 5MB)

### Dokumentácia 📚

- **README.md** - kompletný popis projektu
- **EMAILJS_SETUP.md** - detailný návod na nastavenie EmailJS
- **DEPLOYMENT.md** - inštrukcie pre nasadenie na GitHub Pages
- **CONTRIBUTING.md** - pravidlá pre prispievateľov
- **CHANGELOG.md** - história zmien

### Deployment 🚀

- **GitHub Actions** workflow pre automatické nasadenie
- **GitHub Pages** kompatibilita s `.nojekyll` súborom
- **SPA routing** s 404.html fallback
- **Environment agnostic** konfigurácia

## Plánovane funkcie (v budúcnosti) 🔮

### v1.1.0 - Vylepšenia UX

- [ ] **Wishlist** funkcionalita
- [ ] **Product reviews** a hodnotenia
- [ ] **Product comparison** nástroj
- [ ] **Recently viewed** produkty
- [ ] **Quick view** modal pre produkty

### v1.2.0 - E-commerce rozšírenia

- [ ] **Payment gateway** integrácia (Stripe/PayPal)
- [ ] **Order tracking** systém
- [ ] **Inventory management**
- [ ] **Discount codes** a kupóny
- [ ] **Shipping calculator**

### v1.3.0 - Pokročilé funkcie

- [ ] **Multi-language** podpora (SK/EN)
- [ ] **Dark mode** prepínač
- [ ] **PWA** funkcionalita
- [ ] **Push notifications**
- [ ] **Social media** integrácia

### v2.0.0 - Backend integrácia

- [ ] **Database** backend (Firebase/Supabase)
- [ ] **User accounts** a registrácia
- [ ] **Order history**
- [ ] **Admin dashboard** s analytics
- [ ] **Real-time inventory**

---

## Poznámky k verziovaniu

- **Major** (X.0.0): Breaking changes, nová architektúra
- **Minor** (1.X.0): Nové funkcie, spätne kompatibilné
- **Patch** (1.0.X): Bug fixes, malé vylepšenia

## Odkazy

- **Live Demo**: https://[USERNAME].github.io/cukrarske-nebo/
- **Repository**: https://github.com/[USERNAME]/cukrarske-nebo
- **Issues**: https://github.com/[USERNAME]/cukrarske-nebo/issues
- **EmailJS**: https://www.emailjs.com/
