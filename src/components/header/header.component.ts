import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <a href="#" class="text-3xl font-bold text-pink-500 font-display">
            Cukrárske Nebo
          </a>
        </div>
        <div class="flex items-center space-x-4">
          @if(isAdmin()){
            <button (click)="logout()" class="text-gray-600 hover:text-pink-500 transition-colors text-sm font-semibold">
              Odhlásiť
            </button>
          }
          <button 
            class="text-gray-600 hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-2" 
            aria-label="Vyhľadávanie produktov"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button 
            (click)="openCart()" 
            class="relative text-gray-600 hover:text-pink-500 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-md p-2" 
            [attr.aria-label]="'Otvoriť košík' + (cartCount() > 0 ? ' (' + cartCount() + ' položiek)' : ' (prázdny)')"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            @if (cartCount() > 0) {
              <span 
                class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                [attr.aria-label]="cartCount() + ' položiek v košíku'"
                role="status"
              >
                {{ cartCount() }}
              </span>
            }
          </button>
        </div>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private uiService = inject(UiService);
  private authService = inject(AuthService);
  
  cartCount = this.cartService.cartItemCount;
  isAdmin = this.authService.isAdmin;

  openCart(): void {
    this.uiService.openCart();
  }

  logout(): void {
    this.authService.logout();
  }
}
