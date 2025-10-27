import { Component, ChangeDetectionStrategy, input, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';

type ColorName = 'biela' | 'čierna' | 'zelená' | 'modrá' | 'ružová' | 'červená' | 'hnedá' | 'žltá' | 'dúhová' | 'original';
type Size = 'S' | 'M' | 'L';

@Component({
  selector: 'app-product-card',
  template: `
    @if (product()) {
      <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden group flex flex-col relative">
        @if (isAdmin()) {
          <div class="absolute top-2 right-2 z-10 flex gap-1">
            <button (click)="editProduct()" 
                    class="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors shadow-md"
                    aria-label="Upraviť produkt">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
            </button>
            <button (click)="deleteProduct()" 
                    class="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-md"
                    aria-label="Odstrániť produkt">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        }
        <div class="relative overflow-hidden">
          @if (isUploadedImage()) {
            <img [src]="product()!.imageUrl" [alt]="product()!.name" 
                 (error)="onImageError($event)"
                 class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out">
          } @else {
            <img [ngSrc]="product()!.imageUrl" [alt]="product()!.name" width="400" height="400" 
                 [priority]="priority()"
                 (error)="onImageError($event)"
                 class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out">
          }
          <div class="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="font-semibold text-gray-800 truncate">{{ product()!.name }}</h3>
          <p class="text-sm text-gray-500 mt-1">{{ product()!.category }}</p>

          <!-- Color Selector -->
          <div class="mt-3">
            <p class="text-sm font-medium text-gray-600 mb-1">Farba: <span class="font-bold capitalize">{{ selectedColor() }}</span></p>
            <div class="flex items-center space-x-2 flex-wrap">
              @for (color of colors; track color) {
                <button
                  (click)="selectColor(color)"
                  [attr.aria-label]="color"
                  class="h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-transform transform hover:scale-110"
                  [class]="colorMap[color]"
                  [class.ring-2]="selectedColor() === color"
                  [class.ring-pink-500]="selectedColor() === color"
                  [class.ring-offset-1]="selectedColor() === color">
                    @if(color === 'original') {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    }
                </button>
              }
            </div>
          </div>

          <!-- Size Selector -->
          <div class="mt-3">
            <p class="text-sm font-medium text-gray-600 mb-1">Veľkosť: <span class="font-bold">{{ selectedSize() }}</span></p>
            <div class="flex items-center space-x-2">
              @for (size of sizes; track size) {
                <button
                  (click)="selectSize(size)"
                  [class.bg-pink-500]="selectedSize() === size"
                  [class.text-white]="selectedSize() === size"
                  [class.bg-gray-200]="selectedSize() !== size"
                  [class.text-gray-700]="selectedSize() !== size"
                  class="h-8 w-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-colors text-sm font-semibold">
                  {{ size }}
                </button>
              }
            </div>
          </div>

          <!-- Custom Text Input -->
          <div class="mt-3">
            <label for="customText-{{product()!.id}}" class="text-sm font-medium text-gray-600 mb-1 block">
              Vlastný text (voliteľné):
            </label>
            <input
              type="text"
              id="customText-{{product()!.id}}"
              [(ngModel)]="customTextValue"
              placeholder="Napr. meno, venovanie..."
              maxlength="100"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-colors">
            <p class="text-xs text-gray-500 mt-1">Max. 100 znakov</p>
          </div>

          <div class="flex justify-between items-center mt-auto pt-4">
            <span class="text-lg font-bold text-pink-500">{{ formatPrice(product()!.price) }}</span>
            <button 
              (click)="addToCart()"
              [disabled]="isAdded()"
              [class]="isAdded() ? 'bg-green-500' : 'bg-pink-500 hover:bg-pink-600'"
              class="text-white px-3 py-1 rounded-full text-sm font-semibold transition-colors w-20 text-center">
              @if(isAdded()){
                <span>Pridané!</span>
              } @else {
                <span>Pridať</span>
              }
            </button>
          </div>
        </div>
      </div>
    }
  `,
  imports: [CommonModule, NgOptimizedImage, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  priority = input<boolean>(false);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private uiService = inject(UiService);
  
  isAdded = signal(false);
  selectedColor = signal<ColorName>('original');
  selectedSize = signal<Size>('M');
  customTextValue = signal<string>('');
  isAdmin = this.authService.isAdmin;

  readonly colors: ColorName[] = ['biela', 'čierna', 'zelená', 'modrá', 'ružová', 'červená', 'hnedá', 'žltá', 'dúhová', 'original'];
  readonly sizes: Size[] = ['S', 'M', 'L'];
  
  readonly colorMap: Record<ColorName, string> = {
    original: 'bg-gray-200',
    biela: 'bg-white border border-gray-300',
    čierna: 'bg-black',
    zelená: 'bg-green-500',
    modrá: 'bg-blue-500',
    ružová: 'bg-pink-400',
    červená: 'bg-red-500',
    hnedá: 'bg-yellow-800',
    žltá: 'bg-yellow-400',
    dúhová: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500'
  };

  formatPrice(price: number): string {
    return price.toLocaleString('sk-SK', { style: 'currency', currency: 'EUR' });
  }

  selectColor(color: ColorName): void {
    this.selectedColor.set(color);
  }

  selectSize(size: Size): void {
    this.selectedSize.set(size);
  }

  addToCart(): void {
    if (this.product()) {
      this.cartService.addToCart(
        this.product()!, 
        this.selectedColor(), 
        this.selectedSize(),
        this.customTextValue() || undefined
      );
      this.isAdded.set(true);
      this.customTextValue.set(''); // Vyčistíme text po pridaní
      setTimeout(() => {
        this.isAdded.set(false);
      }, 1500);
    }
  }

  editProduct(): void {
    if (this.product()) {
      this.uiService.openProductEditModal(this.product()!);
    }
  }

  deleteProduct(): void {
    if (this.product() && confirm(`Naozaj chcete odstrániť produkt "${this.product()!.name}"?`)) {
      this.productService.deleteProduct(this.product()!.id);
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Fallback to a placeholder image if the main image fails to load
    img.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Obrázok+sa+nenačítal';
  }

  isUploadedImage(): boolean {
    return this.product()?.imageUrl?.startsWith('data:image/') || false;
  }
}
