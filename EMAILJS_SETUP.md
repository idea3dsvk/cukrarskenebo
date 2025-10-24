# NÁVOD NA NASTAVENIE EMAILJS PRE CUKRÁRSKE NEBO

## 1. Registrácia a základné nastavenie

1. **Registrácia**: Navštívte https://www.emailjs.com/ a zaregistrujte sa
2. **Vytvorenie Email Service**:

   - V dashboarde kliknite na "Email Services"
   - Kliknite "Add New Service"
   - Vyberte váš email provider (Gmail, Outlook, atď.)
   - **DÔLEŽITÉ**: Nastavte Service ID presne na: `service_qghioic`
   - Postupujte podľa inštrukcií pre váš provider

3. **Získanie Public Key**:
   - Choďte do "Account" > "General"
   - Skopírujte "Public Key"
   - Nahraďte `YOUR_PUBLIC_KEY_HERE` v súbore `src/config/email.config.ts`

## 2. Vytvorenie Email Template

1. **Nový Template**:

   - V dashboarde kliknite "Email Templates"
   - Kliknite "Create New Template"
   - **DÔLEŽITÉ**: Nastavte Template ID presne na: `template_objednavka`

2. **Template nastavenie**:

   ```
   Template Name: Objednavka Cukrarske Nebo
   Template ID: template_objednavka
   ```

3. **Email Template obsah**:

### Subject Line:

```
Nová objednávka z Cukrárske Nebo - {{order_number}}
```

### Template Body (HTML):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Nová objednávka</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #ec4899;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
        background-color: #f9f9f9;
      }
      .order-details {
        background-color: white;
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
      }
      .customer-info {
        background-color: #fdf2f8;
        padding: 15px;
        margin: 10px 0;
        border-radius: 5px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      th,
      td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: left;
      }
      th {
        background-color: #f8f9fa;
      }
      .total {
        font-size: 18px;
        font-weight: bold;
        color: #ec4899;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🍰 Cukrárske Nebo</h1>
        <h2>Nová objednávka prijatá!</h2>
      </div>

      <div class="content">
        <div class="order-details">
          <h3>📋 Detaily objednávky</h3>
          <p><strong>Číslo objednávky:</strong> {{order_number}}</p>
          <p><strong>Dátum:</strong> {{order_date}}</p>
          <p class="total"><strong>Celková suma: {{total_amount}}€</strong></p>
        </div>

        <div class="customer-info">
          <h3>👤 Informácie o zákazníkovi</h3>
          <p><strong>Meno:</strong> {{customer_name}}</p>
          <p><strong>Email:</strong> {{customer_email}}</p>
          <p><strong>Telefón:</strong> {{customer_phone}}</p>
          <p><strong>Adresa:</strong> {{customer_address}}</p>
        </div>

        <div class="order-details">
          <h3>🛒 Objednané produkty</h3>
          {{{items_html}}}
        </div>

        <hr style="margin: 20px 0;" />

        <p><strong>Text verzia produktov:</strong></p>
        <pre
          style="background-color: white; padding: 10px; border-radius: 5px;"
        >
{{items_list}}</pre
        >

        <p style="text-align: center; margin-top: 20px;">
          <em
            >Táto objednávka bola automaticky vygenerovaná z webu Cukrárske
            Nebo.</em
          >
        </p>
      </div>
    </div>
  </body>
</html>
```

## 3. Konfigurácia aplikácie

1. **Aktualizujte email.config.ts**:

   ```typescript
   export const EMAIL_CONFIG = {
     SERVICE_ID: "service_qghioic",
     TEMPLATE_ID: "template_objednavka",
     PUBLIC_KEY: "VÁŠ_SKUTOČNÝ_PUBLIC_KEY", // Nahraďte
     SHOP_EMAIL: "vaseemail@gmail.com", // Nahraďte vašim emailom
   };
   ```

2. **Test funkcionality**:
   - Prihlásте sa do admin panelu (heslo: admin123)
   - V pätičke kliknite na "Test Email"
   - Skontrolujte svoju EmailJS konzolu a email

## 4. Premenné dostupné v template

- `{{to_email}}` - Email obchodu
- `{{customer_name}}` - Meno zákazníka
- `{{customer_email}}` - Email zákazníka
- `{{customer_phone}}` - Telefón zákazníka
- `{{customer_address}}` - Kompletná adresa
- `{{order_number}}` - Unikátne číslo objednávky
- `{{order_date}}` - Dátum a čas objednávky
- `{{total_amount}}` - Celková suma (formátované)
- `{{items_list}}` - Zoznam produktov (text)
- `{{items_html}}} ` - Zoznam produktov (HTML tabuľka)

## 5. Testovanie

1. Pridajte produkty do košíka
2. Vyplňte objednávku
3. Kliknite "Odoslať objednávku"
4. Skontrolujte email a EmailJS dashboard

## 6. Riešenie problémov

- **Email sa neodosiela**: Skontrolujte Public Key a Service ID
- **Template sa nenašiel**: Overte Template ID
- **Formátovanie**: Používajte `{{{items_html}}}` (3 zátvorky) pre HTML
- **Debug**: Otvorte browser konzolu pre error správy

## 7. Bezpečnosť

- Public Key je bezpečný pre frontend použitie
- Nikdy nevystavujte Private Key
- Nastavte rate limiting v EmailJS dashboarde
- Monitorujte využitie v EmailJS štatistikách
