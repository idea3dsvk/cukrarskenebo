# Image Upload funkcionalita - Dokumentácia

## 📸 Nová funkcionalita: Upload obrázkov

V administrátorskom paneli je teraz k dispozícii plnohodnotný image upload systém pre produkty.

### ✨ Funkcie:

1. **Drag & Drop Upload**

   - Pretiahnite obrázok priamo do upload oblasti
   - Alebo kliknite pre výber súboru z disku

2. **Podporované formáty**

   - PNG, JPG, JPEG, WebP
   - Maximálna veľkosť: 5MB

3. **Live Preview**

   - Okamžité zobrazenie nahrávaného obrázka
   - Možnosť odstránenia pred uložením

4. **Validácia súborov**

   - Automatická kontrola formátu
   - Kontrola veľkosti súboru
   - Užívateľsky prívetivé chybové hlášky

5. **Fallback možnosti**
   - Stále možnosť zadať URL manuálne
   - Kombinácia upload + URL input

### 🔧 Technické detaily:

```typescript
// Nové komponenty:
- ImageUploadComponent: Hlavný upload komponent
- ImageService: Služba pre správu obrázkov

// Vylepšené komponenty:
- ProductEditModalComponent: Integrovaný upload
```

### 🚀 Použitie v admin paneli:

1. Otvorte admin panel (heslo: admin123)
2. Kliknite na "Upraviť" pri ľubovoľnom produkte
3. V sekcii "Obrázok produktu":
   - Pretiahnite obrázok do upload oblasti
   - Alebo kliknite a vyberte súbor
   - Alternatívne zadajte URL manuálne

### 💡 Budúce vylepšenia:

- **Image optimization**: Automatická kompresia obrázkov
- **Multiple images**: Podpora viacerých obrázkov na produkt
- **Cloud storage**: Integrácia s AWS S3/Cloudinary
- **Crop tool**: Nástroj na orezanie obrázkov
- **Batch upload**: Hromadné nahrávanie obrázkov
