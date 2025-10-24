// EmailJS Konfigurácia pre Cukrárske Nebo
// 
// INŠTRUKCIE PRE NASTAVENIE EMAILJS:
//
// 1. Registrujte sa na https://www.emailjs.com/
// 2. Vytvorte nový Email Service s ID: service_qghioic
// 3. Získajte Public Key z Account > General
// 4. Vytvorte Email Template s ID: template_objednavka
//
// TEMPLATE PREMENNÉ (použite v EmailJS template editore):
// - {{to_email}} - Email obchodu (kde sa objednávky prijímajú)
// - {{customer_name}} - Meno zákazníka
// - {{customer_email}} - Email zákazníka
// - {{customer_phone}} - Telefón zákazníka  
// - {{customer_address}} - Adresa zákazníka
// - {{order_number}} - Číslo objednávky
// - {{order_date}} - Dátum objednávky
// - {{total_amount}} - Celková suma
// - {{items_list}} - Zoznam položiek (text)
// - {{items_html}} - Zoznam položiek (HTML tabuľka)
//
// VZOR EMAIL TEMPLATE:
// Subject: Nová objednávka z Cukrárske Nebo - {{order_number}}
//
// Body:
// Ahoj!
//
// Nová objednávka bola prijatá na webe Cukrárske Nebo.
//
// DETAILY OBJEDNÁVKY:
// Číslo objednávky: {{order_number}}
// Dátum: {{order_date}}
// Celková suma: {{total_amount}}€
//
// ZÁKAZNÍK:
// Meno: {{customer_name}}
// Email: {{customer_email}}
// Telefón: {{customer_phone}}
// Adresa: {{customer_address}}
//
// OBJEDNANÉ PRODUKTY:
// {{{items_html}}}
//
// S pozdravom,
// Cukrárske Nebo Web Systém

export const EMAIL_CONFIG = {
  SERVICE_ID: 'service_qghioic',
  TEMPLATE_ID: 'template_objednavka',
  PUBLIC_KEY: 'Wu5TEgUdMsFc_tOI0', // Nahraďte skutočným kľúčom z EmailJS
  SHOP_EMAIL: 'cukrarskenebo@gmail.com' // Nahraďte skutočným emailom obchodu
};

// DÔLEŽITÉ: Pred nasadením do produkcie nahraďte:
// 1. PUBLIC_KEY - získajte z EmailJS Dashboard > Account > General > Public Key
// 2. SHOP_EMAIL - email, na ktorý sa budú posielať objednávky
//
// Pre bezpečnejšie riešenie použite environment variables (.env.local):
// PUBLIC_KEY: process.env['EMAILJS_PUBLIC_KEY']
// SHOP_EMAIL: process.env['SHOP_EMAIL']