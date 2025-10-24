# 📸 Návod na zmenu obrázkov produktov

## 🔄 Problém: LocalStorage vs Globálne zmeny

**LocalStorage** (doterajšie riešenie):

- ✅ Zmeny sa prejavia okamžite
- ❌ Len v jednom prehliadači
- ❌ Ostatní návštevníci ich nevidia

**Nové riešenie - Export/Import:**

- ✅ Zmeny sa prejavia globálne pre všetkých
- ✅ Synchronizované cez GitHub
- ⚠️ Vyžaduje manuálny commit (jednoduchý proces)

---

## 🎯 Postup zmeny obrázkov (NOVÝ)

### 1️⃣ Prihláste sa do admin panelu

- Kliknite na logo "Cukrárske Nebo"
- Zadajte heslo (predvolené: `admin123`)

### 2️⃣ Zmeňte obrázky produktov

- Kliknite na ✏️ ikonu pri produkte
- Nahrajte nový obrázok alebo zadajte URL
- Kliknite "Uložiť zmeny"

### 3️⃣ Otvorte Admin Panel

- V pravom dolnom rohu sa zobrazí modrý koliesk
  o ⚙️
- Kliknite naň

### 4️⃣ Stiahnite súbory

**A) Stiahnite products.json:**

- Kliknite "📥 Stiahnuť products.json"
- Súbor sa stiahne do priečinka Downloads

**B) Stiahnite návod (voliteľné):**

- Kliknite "📋 Stiahnuť návod"
- Otvorte súbor pre podrobné inštrukcie

### 5️⃣ Nahrajte súbor do projektu

```bash
# Prejdite do priečinka projektu
cd C:\Users\cmelk\Downloads\Cukrarske-Nebo-COMPLETE-BACKUP

# Skopírujte stiahnutý súbor do správneho miesta
# Nahraďte súbor: src/data/products.json
# (Jednoducho presuňte stiahnutý products-*.json do src/data/ a premenujte na products.json)
```

### 6️⃣ Commitnite a pushnite zmeny

```bash
# Pridajte súbor do Git
git add src/data/products.json

# Vytvorte commit
git commit -m "Update: Zmena obrázkov produktov"

# Nahrajte na GitHub
git push
```

### 7️⃣ Počkajte na rebuild

- GitHub Actions automaticky rebuildne stránku
- Trvá 2-3 minúty
- Sledujte progress: https://github.com/idea3dsvk/cukrarskenebo/actions

### 8️⃣ Overte zmeny

- Otvorte stránku v inkognito režime
- Stlačte **Ctrl+F5** pre vymazanie cache
- Zmeny by mali byť viditeľné pre všetkých

---

## 🛠️ Admin Panel funkcie

### 📥 Export zmien

- **Stiahnuť products.json** - uloží všetky produkty s novými obrázkami
- **Stiahnuť návod** - podrobné inštrukcie pre deployment

### ✉️ Test EmailJS

- Overí funkčnosť emailov
- Odošle testovaciu objednávku na váš email

### 🔄 Reset produktov

- Obnoví predvolené obrázky
- Vymaže všetky lokálne zmeny v LocalStorage

### ℹ️ Informácie

- Zobrazuje stav a nápovedu

---

## 🔍 Riešenie problémov

### Problém: Zmeny nie sú viditeľné po pushu

**Riešenie:**

1. Skontrolujte GitHub Actions: https://github.com/idea3dsvk/cukrarskenebo/actions
2. Počkajte na dokončenie buildu (zelená fajka ✅)
3. Vymažte cache prehliadača: Ctrl+Shift+Del
4. Otvorte stránku v inkognito režime

### Problém: Git push hlási chybu

**Riešenie:**

```bash
git pull --rebase
git push
```

### Problém: Neviem kde je stiahnutý products.json

**Riešenie:**

- Windows: `C:\Users\[meno]\Downloads\`
- Hľadajte súbor začínajúci s `products-`

### Problém: Export tlačidlo nefunguje

**Riešenie:**

1. Skontrolujte či ste prihlásený ako admin
2. Otvorte konzolu (F12) a hľadajte chyby
3. Skúste refresh stránky (F5)

---

## 📋 Porovnanie metód

| Funkcia        | LocalStorage                 | Export/Import  |
| -------------- | ---------------------------- | -------------- |
| Rýchlosť zmien | Okamžite                     | 2-3 minúty     |
| Viditeľnosť    | Len lokálne                  | Globálne       |
| Perzistencia   | Po vyčistení cache sa stratí | Natrvalo v Git |
| Synchronizácia | Žiadna                       | Cez GitHub     |
| Vhodné pre     | Testovanie                   | Produkcia      |

---

## 💡 Odporúčania

1. **Používajte LocalStorage pre rýchle testovanie**

   - Zmeňte obrázok
   - Overte ako vyzerá
   - Ak sa páči, exportujte

2. **Exportujte finálne zmeny**

   - Keď ste spokojný so všetkými úpravami
   - Vytvorte jeden commit so všetkými zmenami
   - Push na GitHub

3. **Pravidelne robte zálohy**
   - Export products.json aj bez zmien
   - Uložte súbor niekam bezpečne
   - V prípade problémov môžete obnoviť

---

## 🎓 Video návod (budúci)

Ak potrebujete video návod, napíšte mi na: info@cukrarskenebo.sk

---

**Dátum vytvorenia:** 24.10.2025  
**Verzia:** 1.1.0  
**Autor:** PoRast
