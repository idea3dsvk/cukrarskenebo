import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-view',
  template: `
    <aside class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
           [class.translate-x-0]="isCartOpen()"
           [class.translate-x-full]="!isCartOpen()">
      <div class="flex flex-col h-full">
        <header class="flex items-center justify-between p-4 border-b">
          <h2 class="text-2xl font-bold text-gray-800 font-display">Váš Košík</h2>
          <button (click)="closeCart()" class="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Zavrieť košík">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        @if (cartItems().length > 0) {
          <div class="flex-grow overflow-y-auto p-4">
            <ul class="divide-y divide-gray-200">
              @for (item of cartItems(); track item.cartItemId) {
                <li class="flex py-4">
                  <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img [ngSrc]="item.imageUrl" [alt]="item.name" width="96" height="96" class="h-full w-full object-cover object-center">
                  </div>
                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>{{ item.name }}</h3>
                        <p class="ml-4">{{ formatPrice(item.price * item.quantity) }}</p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500 capitalize">
                        Farba: {{ item.color }} &middot; Veľkosť: {{ item.size }} &middot; {{ formatPrice(item.price) }} / ks
                      </p>
                      @if (item.customText) {
                        <p class="mt-1 text-sm text-pink-600 font-medium italic">
                          📝 "{{ item.customText }}"
                        </p>
                      }
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <div class="flex items-center border border-gray-300 rounded">
                        <button (click)="updateQuantity(item.cartItemId, item.quantity - 1)" class="px-2 py-1 text-gray-600 hover:bg-gray-100">-</button>
                        <span class="px-3 py-1 text-gray-800 w-8 text-center tabular-nums">{{ item.quantity }}</span>
                        <button (click)="updateQuantity(item.cartItemId, item.quantity + 1)" class="px-2 py-1 text-gray-600 hover:bg-gray-100">+</button>
                      </div>
                      <div class="flex">
                        <button (click)="removeFromCart(item.cartItemId)" type="button" class="font-medium text-pink-600 hover:text-pink-500">
                          Odstrániť
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </div>
          <footer class="border-t border-gray-200 p-4">
            <div class="flex justify-between text-lg font-medium text-gray-900">
              <p>Celkom</p>
              <p>{{ formatPrice(cartTotal()) }}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">Cena je vrátane DPH.</p>
            <div class="mt-6">
              <button (click)="proceedToCheckout()" class="w-full flex items-center justify-center rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600 transition-colors">
                Pokračovať v objednávke
              </button>
            </div>
          </footer>
        } @else {
          <div class="flex-grow flex flex-col items-center justify-center p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700">Váš košík je prázdny</h3>
            <p class="mt-2 text-gray-500">Vyzerá to, že ste si ešte nič nevybrali.</p>
            <button (click)="closeCart()" class="mt-6 rounded-md border border-transparent bg-pink-500 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-600 transition-colors">
              Pokračovať v nákupe
            </button>
          </div>
        }
      </div>
    </aside>
  `,
  imports: [CommonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartViewComponent {
  private cartService = inject(CartService);
  private uiService = inject(UiService);

  isCartOpen = this.uiService.isCartOpen;
  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;

  closeCart(): void {
    this.uiService.closeCart();
  }

  proceedToCheckout(): void {
    this.uiService.openCheckout();
  }

  formatPrice(price: number): string {
    return price.toLocaleString('sk-SK', { style: 'currency', currency: 'EUR' });
  }

  updateQuantity(cartItemId: string, quantity: number): void {
    this.cartService.updateQuantity(cartItemId, quantity);
  }

  removeFromCart(cartItemId: string): void {
    this.cartService.removeFromCart(cartItemId);
  }
}
