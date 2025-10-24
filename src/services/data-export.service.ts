import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {
  
  /**
   * Exportuje produkty do JSON súboru na stiahnutie
   */
  exportProductsToFile(products: Product[]): void {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Products exported to file');
  }

  /**
   * Vytvorí deployment inštrukcie ako text súbor
   */
  exportDeploymentInstructions(): void {
    const instructions = `
NÁVOD NA NASADENIE ZMIEN PRODUKTOV
===================================

1. NAHRAJTE SÚBOR:
   - Stiahnutý JSON súbor (products.json) nahrajte do priečinka:
     src/data/products.json
   - DÔLEŽITÉ: Súbor musí mať presný názov "products.json"

2. COMMITNITE ZMENY:
   cd /cesta/k/projektu
   git add src/data/products.json
   git commit -m "Update: Zmena produktových obrázkov"
   git push

3. POČKAJTE NA BUILD:
   - GitHub Actions automaticky rebuildne stránku
   - Zmeny budú viditeľné o 2-3 minúty na všetkých zariadeniach

4. OVERENIE:
   - Otvorte stránku v inkognito režime
   - Stlačte Ctrl+F5 pre vymazanie cache
   - Zmeny by mali byť viditeľné

POZNÁMKA:
- Tento proces je potrebný len raz po zmene obrázkov
- Zmeny sa prejavia globálne pre všetkých návštevníkov
- Nie je potrebné meniť nič v LocalStorage

Dátum exportu: ${new Date().toLocaleString('sk-SK')}
`;

    const blob = new Blob([instructions], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DEPLOY_INSTRUCTIONS.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Importuje produkty zo stiahnutého JSON súboru
   */
  async importProductsFromFile(file: File): Promise<Product[] | null> {
    try {
      const text = await file.text();
      const products: Product[] = JSON.parse(text);
      
      // Validácia základnej štruktúry
      if (!Array.isArray(products)) {
        throw new Error('Invalid format: Expected array of products');
      }
      
      // Validácia každého produktu
      for (const product of products) {
        if (!product.id || !product.name || !product.price || !product.category || !product.imageUrl) {
          throw new Error(`Invalid product structure: ${JSON.stringify(product)}`);
        }
      }
      
      console.log('Products imported successfully:', products.length);
      return products;
    } catch (error) {
      console.error('Error importing products:', error);
      return null;
    }
  }
}
