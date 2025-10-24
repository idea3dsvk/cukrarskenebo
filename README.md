# Cukrárske Nebo 🍰

Moderná e-commerce webová stránka pre predaj cukrárskych ozdôb a doplnkov vytvorená v Angular 20.

## ✨ Funkcie

- 📱 **Responzívny dizajn** - funguje na všetkých zariadeniach
- 🛒 **Nákupný košík** s možnosťou úpravy množstva
- 🔍 **Vyhľadávanie** produktov v reálnom čase
- 📂 **Kategórie produktov** s filtrovaním
- 📄 **Stránkovanie** pre lepšiu navigáciu
- 👤 **Admin panel** na správu produktov
- 📤 **Upload obrázkov** s drag & drop funkciou
- 📧 **EmailJS integrácia** pre objednávky
- 💾 **LocalStorage** perzistencia dát
- ⚡ **Optimalizované obrázky** s lazy loading
- 🎨 **Moderný UI/UX** s Tailwind CSS

## 🚀 Live Demo

Stránka bude dostupná na: **https://idea3dsvk.github.io/cukrarskenebo/**

## 🛠️ Technológie

- **Angular 20** - moderný framework
- **TypeScript 5.8.2** - type-safe development
- **Tailwind CSS** - utility-first CSS
- **RxJS Signals** - reaktívne programovanie
- **EmailJS** - odosielanie emailov
- **GitHub Actions** - automatické nasadenie

## 📦 Inštalácia a spustenie

1. **Klonujte repozitár**:

   ```bash
   git clone https://github.com/idea3dsvk/cukrarskenebo.git
   cd cukrarskenebo
   ```

2. **Spustite lokálne**:

   ```bash
   npx http-server -p 3000
   ```

3. **Otvorte prehliadač**:
   ```
   http://localhost:3000
   ```

## ⚙️ Konfigurácia

### EmailJS nastavenie

1. Zaregistrujte sa na [EmailJS](https://www.emailjs.com/)
2. Vytvorte Service s ID: `service_qghioic`
3. Vytvorte Template s ID: `template_objednavka`
4. Aktualizujte `src/config/email.config.ts`:

```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: "service_qghioic",
  TEMPLATE_ID: "template_objednavka",
  PUBLIC_KEY: "VÁŠ_PUBLIC_KEY",
  SHOP_EMAIL: "vas@email.com",
};
```

Detailný návod nájdete v súbore `EMAILJS_SETUP.md`.

### Admin panel

- **Prístup**: Kliknite na logo "Cukrárske Nebo"
- **Heslo**: `admin123`
- **Funkcie**: Úprava produktov, upload obrázkov, test emailov

## 📋 Produktové kategórie

- 🏷️ **Meno** - personalizované nápisy a zápichi
- 🔢 **Meno + číslo** - kombinované dekorácie
- 🎭 **Figúrky** - jedlé postavičky a objekty
- #️⃣ **Číslo** - číselné dekorácie
- 🖼️ **Obrázok** - jedlé obrázky a fotky
- 🏢 **Logo** - firemné a značkové dekorácie
- 🦊 **Zvieratá** - zvieracie motívy
- ⛪ **Krst** - náboženské motívy
- 💒 **Svadba** - svadobné dekorácie
- 💕 **Láska** - romantické motívy
- 👨‍⚕️ **Povolanie/Hobby** - tematické dekorácie

## 🔧 Vývoj

### Štruktúra projektu

```
src/
├── components/          # Angular komponenty
├── services/           # Služby (API, state management)
├── models/            # TypeScript modely
├── config/           # Konfiguráčné súbory
└── app.component.ts  # Hlavný komponent
```

### Pridanie nového produktu

Produkty sú definované v `src/services/product.service.ts`. Nový produkt pridáte do príslušnej kategórie:

```typescript
{
  id: 'unique-id',
  name: 'Názov produktu',
  price: 9.99,
  category: 'Kategória',
  imageUrl: 'URL obrázka'
}
```

## 📱 Screenshots

### Hlavná stránka

- Responzívny grid produktov
- Vyhľadávanie a filtrovanie
- Moderný dizajn

### Nákupný košík

- Pridávanie/odoberanie produktov
- Kalkulácia celkovej ceny
- Checkout proces

### Admin panel

- Upload obrázkov
- Úprava produktov
- Test email funkcionalita

## 🌐 Nasadenie na GitHub Pages

1. **Forkni repozitár**
2. **Povoľ GitHub Pages** v nastaveniach
3. **Nastav source** na "GitHub Actions"
4. **Push zmeny** - automaticky sa nasadí

## 🐛 Riešenie problémov

### Obrázky sa nezobrazujú

- Skontroluj konzolu pre 404 errors
- Overte URL obrázkov v `product.service.ts`

### EmailJS nefunguje

- Overte konfiguráciu v `email.config.ts`
- Skontroluj Public Key a Service ID
- Použite "Test Email" tlačidlo v admin paneli

### LocalStorage problémy

- Vyčistite browser cache
- Skontroluj konzolu pre localStorage errors
- Použite "Reset produktov" v admin paneli

## 📄 Licencia

MIT License - pozrite `LICENSE` súbor pre detaily.

## 👥 Prispievanie

1. Forkni projekt
2. Vytvor feature branch (`git checkout -b feature/nova-funkcionalita`)
3. Commitni zmeny (`git commit -am 'Pridaj novú funkcionalitu'`)
4. Push na branch (`git push origin feature/nova-funkcionalita`)
5. Vytvor Pull Request

## 📞 Kontakt

Vyvinul: **PoRast**  
Email: info@cukrarskenebo.sk  
Web: [Cukrárske Nebo](https://idea3dsvk.github.io/cukrarskenebo/)

---

⭐ **Ak sa vám projekt páči, dajte mu hviezdu na GitHube!** ⭐
