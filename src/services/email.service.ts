import { Injectable } from '@angular/core';
import { EMAIL_CONFIG } from '../config/email.config';

declare global {
  interface Window {
    emailjs: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = EMAIL_CONFIG.SERVICE_ID;
  private templateId = EMAIL_CONFIG.TEMPLATE_ID;
  private publicKey = EMAIL_CONFIG.PUBLIC_KEY;

  constructor() {
    // Inicializácia EmailJS
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init(this.publicKey);
    }
  }

  async sendOrderEmail(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      color?: string;
      size?: string;
      total: number;
    }>;
    totalAmount: number;
    orderNumber: string;
    orderDate: string;
  }): Promise<boolean> {
    try {
      if (!window.emailjs) {
        console.error('EmailJS nie je dostupný');
        return false;
      }

      // Príprava dát pre email template
      const templateParams = {
        to_email: EMAIL_CONFIG.SHOP_EMAIL,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        order_number: orderData.orderNumber,
        order_date: orderData.orderDate,
        total_amount: orderData.totalAmount.toFixed(2),
        items_list: this.formatItemsList(orderData.items),
        items_html: this.formatItemsHtml(orderData.items)
      };

      console.log('Odosielam email s dátami:', templateParams);

      const result = await window.emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('Email úspešne odoslaný:', result);
      return true;

    } catch (error) {
      console.error('Chyba pri odosielaní emailu:', error);
      return false;
    }
  }

  private formatItemsList(items: Array<{name: string, price: number, quantity: number, color?: string, size?: string, customText?: string, total: number}>): string {
    return items.map(item => {
      let itemText = `${item.name}`;
      if (item.color) itemText += ` (Farba: ${item.color})`;
      if (item.size) itemText += ` (Veľkosť: ${item.size})`;
      if (item.customText) itemText += ` [Text: "${item.customText}"]`;
      itemText += ` - ${item.quantity}x po ${item.price.toFixed(2)}€ = ${item.total.toFixed(2)}€`;
      return itemText;
    }).join('\n');
  }

  private formatItemsHtml(items: Array<{name: string, price: number, quantity: number, color?: string, size?: string, customText?: string, total: number}>): string {
    const rows = items.map(item => {
      let productName = item.name;
      const details: string[] = [];
      if (item.color) details.push(`<strong>Farba:</strong> ${item.color}`);
      if (item.size) details.push(`<strong>Veľkosť:</strong> ${item.size}`);
      if (item.customText) details.push(`<strong>Vlastný text:</strong> <em>"${item.customText}"</em>`);
      
      const detailsHtml = details.length > 0 
        ? `<br><small style="color: #666;">${details.join(' | ')}</small>` 
        : '';
      
      return `<tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${productName}${detailsHtml}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.price.toFixed(2)}€</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.total.toFixed(2)}€</td>
      </tr>`;
    }).join('');

    return `
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Produkt</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Množstvo</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Cena</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Celkom</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  }

  // Metóda na testovanie EmailJS konfigurácie
  async testEmailService(): Promise<boolean> {
    try {
      const testData = {
        customerName: 'Test Zákazník',
        customerEmail: 'test@example.com',
        customerPhone: '+421 123 456 789',
        customerAddress: 'Testovacia 123, Bratislava',
        items: [
          { name: 'Test produkt', price: 5.99, quantity: 2, color: 'Ružová', size: 'Veľká', total: 11.98 }
        ],
        totalAmount: 11.98,
        orderNumber: 'TEST-001',
        orderDate: new Date().toLocaleString('sk-SK')
      };

      return await this.sendOrderEmail(testData);
    } catch (error) {
      console.error('Test emailu zlyhal:', error);
      return false;
    }
  }
}