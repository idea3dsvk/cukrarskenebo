import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isCartOpen = signal(false);
  isCheckoutOpen = signal(false);
  isLoginModalOpen = signal(false);
  isProductEditModalOpen = signal(false);
  
  editingProduct = signal<Product | null>(null);

  openCart(): void {
    this.isCartOpen.set(true);
    this.isCheckoutOpen.set(false);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  openCheckout(): void {
    this.isCartOpen.set(false);
    this.isCheckoutOpen.set(true);
  }

  closeCheckout(): void {
    this.isCheckoutOpen.set(false);
  }

  backToCart(): void {
    this.isCheckoutOpen.set(false);
    this.isCartOpen.set(true);
  }

  openLoginModal(): void {
    this.isLoginModalOpen.set(true);
  }

  closeLoginModal(): void {
    this.isLoginModalOpen.set(false);
  }

  openProductEditModal(product: Product): void {
    this.editingProduct.set(product);
    this.isProductEditModalOpen.set(true);
  }

  closeProductEditModal(): void {
    this.isProductEditModalOpen.set(false);
    this.editingProduct.set(null);
  }

  closeAllPanels(): void {
    this.isCartOpen.set(false);
    this.isCheckoutOpen.set(false);
    this.isLoginModalOpen.set(false);
    this.isProductEditModalOpen.set(false);
  }
}
