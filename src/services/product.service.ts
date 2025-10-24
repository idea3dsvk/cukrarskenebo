import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    // Meno (9)
    { id: 'p1', name: 'Zlaté cukrové perličky', price: 3.49, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p1/400/400' },
    { id: 'p5', name: 'Farebné dúhové posypy', price: 2.99, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p5/400/400' },
    { id: 'p9', name: 'Strieborný jedlý prach', price: 4.99, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p9/400/400' },
    { id: 'p13', name: 'Cukrové hviezdičky', price: 2.89, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p13/400/400' },
    { id: 'p36', name: 'Zápich s menom - elegantný font', price: 7.50, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p36/400/400' },
    { id: 'p37', name: 'Zrkadlový zápich s menom', price: 8.99, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p37/400/400' },
    { id: 'p38', name: 'Drevený zápich s menom', price: 6.90, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p38/400/400' },
    { id: 'p39', name: 'Personalizovaný zápich s menom', price: 8.20, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p39/400/400' },
    { id: 'p40', name: 'Meno v srdiečku - zápich', price: 7.80, category: 'Meno', imageUrl: 'https://picsum.photos/seed/p40/400/400' },
    
    // Meno + číslo (9)
    { id: 'p2', name: 'Jedlé kvety - Fialky', price: 5.99, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p2/400/400' },
    { id: 'p6', name: 'Jedlé kvety - Ruže', price: 6.49, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p6/400/400' },
    { id: 'p10', name: 'Jedlé sušené nevädze', price: 5.29, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p10/400/400' },
    { id: 'p41', name: 'Zápich Meno a vek - moderný dizajn', price: 9.50, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p41/400/400' },
    { id: 'p42', name: 'Zápich s menom a číslom - zlatý', price: 10.99, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p42/400/400' },
    { id: 'p43', name: 'Personalizovaný zápich s menom a vekom', price: 9.90, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p43/400/400' },
    { id: 'p44', name: 'Dvojitý zápich - meno a číslo', price: 11.50, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p44/400/400' },
    { id: 'p45', name: 'Meno a číslo s hviezdičkami', price: 9.80, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p45/400/400' },
    { id: 'p46', name: 'Drevený zápich meno a vek', price: 8.90, category: 'Meno + číslo', imageUrl: 'https://picsum.photos/seed/p46/400/400' },

    // Figúrky (9)
    { id: 'p3', name: 'Marcipánová figúrka - Medvedík', price: 4.29, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p3/400/400' },
    { id: 'p7', name: 'Fondánová figúrka - Princezná', price: 5.79, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p7/400/400' },
    { id: 'p11', name: 'Cukrová figúrka - Auto', price: 4.99, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p11/400/400' },
    { id: 'p14', name: 'Marcipánová figúrka - Jednorožec', price: 6.99, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p14/400/400' },
    { id: 'p47', name: 'Cukrový dinosaurus', price: 6.20, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p47/400/400' },
    { id: 'p48', name: 'Marcipánová morská panna', price: 5.90, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p48/400/400' },
    { id: 'p49', name: 'Jedlá figúrka superhrdinu', price: 7.10, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p49/400/400' },
    { id: 'p50', name: 'Fondánový jednorožec na dúhe', price: 8.50, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p50/400/400' },
    { id: 'p51', name: 'Cukrová víla', price: 5.80, category: 'Figúrky', imageUrl: 'https://picsum.photos/seed/p51/400/400' },

    // Číslo (9)
    { id: 'p4', name: 'Horké čokoládové hoblinky', price: 3.99, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p4/400/400' },
    { id: 'p8', name: 'Biele čokoládové guličky', price: 4.49, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p8/400/400' },
    { id: 'p12', name: 'Mliečne čokoládové srdiečka', price: 3.79, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p12/400/400' },
    { id: 'p15', name: 'Čokoládové lístky', price: 4.19, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p15/400/400' },
    { id: 'p52', name: 'Zápich s číslom - trblietavý', price: 4.50, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p52/400/400' },
    { id: 'p53', name: 'Veľké číslo - zlaté', price: 5.20, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p53/400/400' },
    { id: 'p54', name: 'Drevené číslo na tortu', price: 4.80, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p54/400/400' },
    { id: 'p55', name: 'Číslo s korunkou', price: 5.50, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p55/400/400' },
    { id: 'p56', name: 'Sada číslic 0-9', price: 9.99, category: 'Číslo', imageUrl: 'https://picsum.photos/seed/p56/400/400' },
    
    // Šport (9)
    { id: 'p16', name: 'Futbalová lopta - zápich', price: 4.50, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p16/400/400' },
    { id: 'p17', name: 'Tenisová raketa - jedlá ozdoba', price: 3.80, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p17/400/400' },
    { id: 'p57', name: 'Hokejka a puk - jedlé ozdoby', price: 5.10, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p57/400/400' },
    { id: 'p58', name: 'Basketbalová lopta - zápich', price: 4.60, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p58/400/400' },
    { id: 'p59', name: 'Bicykel - zápich na tortu', price: 5.30, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p59/400/400' },
    { id: 'p60', name: 'Fitness sada - činky a kettlebell', price: 6.80, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p60/400/400' },
    { id: 'p61', name: 'Plavecké okuliare a čiapka - marcipán', price: 5.90, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p61/400/400' },
    { id: 'p62', name: 'Lyže a palice - zápich', price: 5.40, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p62/400/400' },
    { id: 'p63', name: 'Šachová figúrka - jedlá', price: 4.90, category: 'Šport', imageUrl: 'https://picsum.photos/seed/p63/400/400' },

    // Deti (9)
    { id: 'p18', name: 'Detský vláčik - marcipán', price: 7.20, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p18/400/400' },
    { id: 'p19', name: 'Postavička z rozprávky', price: 6.50, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p19/400/400' },
    { id: 'p64', name: 'Dúha a obláčiky - marcipán', price: 6.90, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p64/400/400' },
    { id: 'p65', name: 'Vesmírna raketa - figúrka', price: 7.50, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p65/400/400' },
    { id: 'p66', name: 'Pirátska loď - jedlá ozdoba', price: 8.20, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p66/400/400' },
    { id: 'p67', name: 'Stavebné kocky - jedlé', price: 5.80, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p67/400/400' },
    { id: 'p68', name: 'Hrad pre princeznú - zápich', price: 9.10, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p68/400/400' },
    { id: 'p69', name: 'Súprava zvieratiek zo ZOO', price: 10.50, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p69/400/400' },
    { id: 'p70', name: 'Balóniky - jedlé zápichy', price: 4.90, category: 'Deti', imageUrl: 'https://picsum.photos/seed/p70/400/400' },

    // Logo (9)
    { id: 'p20', name: 'Jedlé firemné logo', price: 9.99, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p20/400/400' },
    { id: 'p71', name: 'Vlastné logo na jedlom papieri - kruh', price: 12.00, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p71/400/400' },
    { id: 'p72', name: 'Firemné logo - obdĺžnik', price: 12.00, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p72/400/400' },
    { id: 'p73', name: 'Jedlé logo - ľubovoľný tvar', price: 15.00, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p73/400/400' },
    { id: 'p74', name: 'Logo športového klubu', price: 13.50, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p74/400/400' },
    { id: 'p75', name: 'Logo na cupcakes (12ks)', price: 14.00, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p75/400/400' },
    { id: 'p76', name: 'Cukrové logo s 3D efektom', price: 18.00, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p76/400/400' },
    { id: 'p77', name: 'Zlaté jedlé logo', price: 16.50, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p77/400/400' },
    { id: 'p78', name: 'Strieborné jedlé logo', price: 16.50, category: 'Logo', imageUrl: 'https://picsum.photos/seed/p78/400/400' },
    
    // Zvieratá (9)
    { id: 'p21', name: 'Zápich - psík', price: 4.90, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p21/400/400' },
    { id: 'p22', name: 'Zápich - mačička', price: 4.90, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p22/400/400' },
    { id: 'p79', name: 'Zápich - líška', price: 5.20, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p79/400/400' },
    { id: 'p80', name: 'Jedlá figúrka - sloník', price: 6.00, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p80/400/400' },
    { id: 'p81', name: 'Zápich - lesné zvieratká (sada)', price: 9.50, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p81/400/400' },
    { id: 'p82', name: 'Domáce zvieratká - marcipán (sada)', price: 10.20, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p82/400/400' },
    { id: 'p83', name: 'Morský svet - figúrky', price: 8.80, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p83/400/400' },
    { id: 'p84', name: 'Panda - jedlá figúrka', price: 5.90, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p84/400/400' },
    { id: 'p85', name: 'Zápich - motýle', price: 4.50, category: 'Zvieratá', imageUrl: 'https://picsum.photos/seed/p85/400/400' },
    
    // Krst (9)
    { id: 'p23', name: 'Zápich - holubičky', price: 5.50, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p23/400/400' },
    { id: 'p24', name: 'Anjelik - jedlá figúrka', price: 6.10, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p24/400/400' },
    { id: 'p86', name: 'Zápich - krížik', price: 4.80, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p86/400/400' },
    { id: 'p87', name: 'Detské topánočky - cukrové', price: 7.20, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p87/400/400' },
    { id: 'p88', name: 'Kočiarik - zápich', price: 6.50, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p88/400/400' },
    { id: 'p89', name: 'Cumlík - marcipán', price: 4.90, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p89/400/400' },
    { id: 'p90', name: 'Meno a dátum krstu - zápich', price: 8.90, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p90/400/400' },
    { id: 'p91', name: 'Body s menom - jedlý obrázok', price: 7.50, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p91/400/400' },
    { id: 'p92', name: 'Svätý obrázok na jedlom papieri', price: 9.00, category: 'Krst', imageUrl: 'https://picsum.photos/seed/p92/400/400' },
    
    // Svadba (9)
    { id: 'p25', name: 'Svadobné postavičky', price: 12.99, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p25/400/400' },
    { id: 'p26', name: 'Zápich - Mr. & Mrs.', price: 8.50, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p26/400/400' },
    { id: 'p93', name: 'Zápich - iniciály mladomanželov', price: 9.20, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p93/400/400' },
    { id: 'p94', name: 'Obrúčky - zlaté, jedlé', price: 7.80, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p94/400/400' },
    { id: 'p95', name: 'Svadobné auto - figúrka', price: 10.50, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p95/400/400' },
    { id: 'p96', name: 'Kaligrafický nápis "Láska"', price: 8.00, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p96/400/400' },
    { id: 'p97', name: 'Dátum svadby - zápich', price: 7.90, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p97/400/400' },
    { id: 'p98', name: 'Siluety páru - zápich', price: 8.80, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p98/400/400' },
    { id: 'p99', name: 'Svadobná torta - miniatúrna figúrka', price: 11.20, category: 'Svadba', imageUrl: 'https://picsum.photos/seed/p99/400/400' },
    
    // Láska (9)
    { id: 'p27', name: 'Červené srdiečka - posyp', price: 3.20, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p27/400/400' },
    { id: 'p28', name: 'Zápich - nápis Láska', price: 5.00, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p28/400/400' },
    { id: 'p100', name: 'Amorov šíp - zápich', price: 5.50, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p100/400/400' },
    { id: 'p101', name: 'Kľúč k môjmu srdcu - jedlá ozdoba', price: 6.20, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p101/400/400' },
    { id: 'p102', name: 'Nápis "Ľúbim Ťa"', price: 7.00, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p102/400/400' },
    { id: 'p103', name: 'Pár labutí - cukrové', price: 8.50, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p103/400/400' },
    { id: 'p104', name: 'Puzzle srdce - zápich', price: 6.80, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p104/400/400' },
    { id: 'p105', name: 'Medovníkové srdce s nápisom', price: 4.90, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p105/400/400' },
    { id: 'p106', name: 'Ruže z fondánu (sada)', price: 9.30, category: 'Láska', imageUrl: 'https://picsum.photos/seed/p106/400/400' },
    
    // Povolanie / Hobby (9)
    { id: 'p29', name: 'Doktorský set - jedlé ozdoby', price: 6.80, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p29/400/400' },
    { id: 'p30', name: 'Hasičská prilba - zápich', price: 5.30, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p30/400/400' },
    { id: 'p31', name: 'Maliarska paleta - zápich', price: 4.90, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p31/400/400' },
    { id: 'p32', name: 'Notová osnova - jedlý papier', price: 4.50, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p32/400/400' },
    { id: 'p107', name: 'Stetoskop a lieky - jedlé', price: 6.90, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p107/400/400' },
    { id: 'p108', name: 'Šijací stroj - zápich', price: 5.80, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p108/400/400' },
    { id: 'p109', name: 'Kniha - jedlá ozdoba', price: 6.10, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p109/400/400' },
    { id: 'p110', name: 'Počítač - figúrka', price: 7.20, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p110/400/400' },
    { id: 'p111', name: 'Rybársky prút - zápich', price: 5.50, category: 'Povolanie / Hobby', imageUrl: 'https://picsum.photos/seed/p111/400/400' },

    // Zábavné (9)
    { id: 'p33', name: 'Vtipný zápich - Stredný prst', price: 4.20, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p33/400/400' },
    { id: 'p34', name: 'Zápich - Game Over', price: 5.60, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p34/400/400' },
    { id: 'p35', name: 'Jedlá postavička - Meme žaba', price: 6.00, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p35/400/400' },
    { id: 'p112', name: 'Zápich - "Starý/á ale zlatý/á"', price: 7.50, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p112/400/400' },
    { id: 'p113', name: 'Toaletný papier - jedlá figúrka', price: 5.90, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p113/400/400' },
    { id: 'p114', name: 'Smajlík - sada zápichov', price: 6.30, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p114/400/400' },
    { id: 'p115', name: 'Zápich - "Konečne 18"', price: 6.90, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p115/400/400' },
    { id: 'p116', name: 'Fľaša alkoholu - jedlá figúrka', price: 7.20, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p116/400/400' },
    { id: 'p117', name: '"Level Up" herný zápich', price: 6.50, category: 'Zábavné', imageUrl: 'https://picsum.photos/seed/p117/400/400' },
  ];

  productsSignal = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

  constructor(private localStorageService: LocalStorageService) {
    // Load products from localStorage if available, otherwise use default products
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (this.localStorageService.isAvailable()) {
      console.log('Loading products from localStorage...');
      const storedProducts = this.localStorageService.loadProducts();
      console.log('Stored products found:', storedProducts?.length || 0);
      
      if (storedProducts && storedProducts.length > 0) {
        // Update stored products with uploaded images
        const updatedProducts = storedProducts.map(product => {
          const uploadedImage = this.localStorageService.getUploadedImage(product.id);
          if (uploadedImage) {
            console.log(`Found uploaded image for product ${product.id}`);
            return { ...product, imageUrl: uploadedImage };
          }
          return product;
        });
        console.log('Setting products signal with loaded data:', updatedProducts.length);
        this.productsSignal.set(updatedProducts);
      } else {
        console.log('No stored products found, using default products');
        // Set default products to signal
        this.productsSignal.set([...this.products]);
        // Save default products to localStorage for next time
        this.saveToStorage();
      }
    } else {
      console.log('localStorage not available, using default products');
      this.productsSignal.set([...this.products]);
    }
  }

  private saveToStorage(): void {
    if (this.localStorageService.isAvailable()) {
      this.localStorageService.saveProducts(this.productsSignal());
    }
  }

  getProducts() {
    return this.productsSignal.asReadonly();
  }

  updateProduct(updatedProduct: Product): void {
    console.log('Updating product:', updatedProduct);
    this.isLoading.set(true);
    // Simulate API call delay
    setTimeout(() => {
      this.productsSignal.update(products =>
        products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      
      console.log('Product updated in signal');
      
      // Save to localStorage
      this.saveToStorage();
      
      // If the image is a data URL (uploaded image), save it separately
      if (updatedProduct.imageUrl.startsWith('data:image/')) {
        console.log('Saving uploaded image for product:', updatedProduct.id);
        this.localStorageService.saveUploadedImage(updatedProduct.id, updatedProduct.imageUrl);
      }
      
      this.isLoading.set(false);
    }, 300);
  }

  getIsLoading() {
    return this.isLoading.asReadonly();
  }

  // Simulate loading products from API
  loadProducts(): void {
    this.isLoading.set(true);
    // Simulate API delay
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  // Get initial/default products
  getInitialProducts(): Product[] {
    return [...this.products];
  }

  // Reset products to default state
  resetProducts(): void {
    this.localStorageService.clearAll();
    this.productsSignal.set([...this.products]); // Reset to original products
    this.saveToStorage();
  }
}
