import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartItemCount = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  cartTotal = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.price * item.quantity, 0);
  });

  addToCart(product: Product, color: string, size: string): void {
    this.cartItems.update(items => {
      const cartItemId = `${product.id}-${color}-${size}`;
      const itemInCart = items.find(item => item.cartItemId === cartItemId);

      if (itemInCart) {
        // Increase quantity if item with same ID, color, and size already exists
        return items.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...items, { ...product, quantity: 1, color, size, cartItemId }];
      }
    });
  }

  updateQuantity(cartItemId: string, quantity: number): void {
    this.cartItems.update(items =>
      items.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  }

  removeFromCart(cartItemId: string): void {
    this.cartItems.update(items => items.filter(item => item.cartItemId !== cartItemId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
