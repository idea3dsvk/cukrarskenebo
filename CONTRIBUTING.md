# Prispievanie do projektu Cukrárske Nebo

Ďakujeme za váš záujem o prispievanie do projektu Cukrárske Nebo! 🎉

## 🚀 Ako prispieť

### 1. Forkni repozitár

- Kliknite na tlačidlo "Fork" v pravom hornom rohu
- Klonujte svoj fork lokálne:

```bash
git clone https://github.com/[VAŠE_POUŽÍVATEĽSKÉ_MENO]/cukrarske-nebo.git
cd cukrarske-nebo
```

### 2. Vytvorte branch

```bash
git checkout -b feature/nova-funkcionalita
```

### 3. Vykonajte zmeny

- Dodržiavajte existujúci kódový štýl
- Pridajte komentáre pre komplexnú logiku
- Testujte svoje zmeny lokálne

### 4. Commitnite zmeny

```bash
git add .
git commit -m "Pridaj novú funkcionalitu: popis"
```

### 5. Push a Pull Request

```bash
git push origin feature/nova-funkcionalita
```

Potom vytvorte Pull Request cez GitHub interface.

## 📋 Typy príspevkov

### 🐛 Bug reporty

- Použite GitHub Issues
- Opíšte problém detailne
- Pridajte screenshots ak je to možné
- Uveďte kroky na reprodukovanie

### ✨ Nové funkcie

- Najprv vytvorte Issue s návrhom
- Diskutujte implementáciu
- Potom vytvorte Pull Request

### 📖 Dokumentácia

- Vylepšenia README.md
- Komentáre v kóde
- Návody a tutoriály

### 🎨 Dizajn a UX

- Vylepšenia responzívneho dizajnu
- Accessibility improvements
- Nové UI komponenty

## 🛠️ Vývojárske pravidlá

### Kódový štýl

- **TypeScript** - používajte typovanie
- **Komponenty** - standalone Angular komponenty
- **Signály** - preferujte RxJS signály pred observable
- **CSS** - používajte Tailwind CSS utility classes

### Commit správy

```
typ(rozsah): krátky popis

Dlhší popis ak je potrebný.

Fixes #123
```

**Typy commitov:**

- `feat` - nová funkcionalita
- `fix` - oprava chyby
- `docs` - dokumentácia
- `style` - formátovanie, CSS
- `refactor` - refaktorovanie kódu
- `test` - testy
- `chore` - maintenance

### Štruktúra súborov

```
src/
├── components/
│   └── [komponent-name]/
│       ├── [komponent-name].component.ts
│       └── [komponent-name].component.html (ak je potrebný)
├── services/
├── models/
├── config/
└── utils/
```

## 🔍 Code Review proces

1. **Automatické kontroly** musia prejsť
2. **Peer review** od maintainerov
3. **Testovanie** na rôznych zariadeniach
4. **Merge** po schválení

## 🎯 Priority oblasti

### Vysoká priorita

- 🐛 Opravy kritických chýb
- 📱 Mobile responsiveness
- ♿ Accessibility improvements
- 🔒 Security vylepšenia

### Stredná priorita

- ✨ Nové funkcie
- 🎨 UI/UX vylepšenia
- ⚡ Performance optimalizácie
- 📊 Analytics a tracking

### Nízka priorita

- 📖 Dokumentácia
- 🧹 Code cleanup
- 🔧 DevTools improvements

## 💡 Nápady na príspevky

### Frontend vylepšenia

- **Wishlist funkcionalita** - obľúbené produkty
- **Porovnávanie produktov** - side-by-side porovnanie
- **Reviews a hodnotenia** - zákaznícke recenzie
- **Multi-language support** - Slovak/English
- **Dark mode** - tmavý motív
- **Progressive Web App** - PWA funkcionalita

### Backend integrácie

- **Payment gateway** - Stripe/PayPal integrácia
- **Inventory management** - správa skladu
- **Order tracking** - sledovanie objednávok
- **CMS integrácia** - Strapi/Contentful
- **Database integrácia** - Firebase/Supabase

### DevOps a tooling

- **Testing suite** - Jest/Cypress testy
- **Linting** - ESLint/Prettier setup
- **Bundle analysis** - webpack analyzér
- **Performance monitoring** - Lighthouse CI
- **Error tracking** - Sentry integrácia

## 🏆 Uznanie prispievateľov

Všetci prispievatelia budú uvedení v:

- README.md (Contributors sekcia)
- GitHub Contributors graf
- Release notes pre významné príspevky

## 📞 Komunikácia

- **GitHub Issues** - bugs a feature requests
- **GitHub Discussions** - všeobecné diskusie
- **Pull Request reviews** - code review
- **Email** - [kontakt@email.com] pre súkromné veci

## 📚 Užitočné zdroje

### Dokumentácia

- [Angular Documentation](https://angular.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS](https://www.emailjs.com/docs/)

### Nástroje

- [VS Code](https://code.visualstudio.com/)
- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

**Ďakujeme za váš príspevok k projektu Cukrárske Nebo! 🍰✨**
