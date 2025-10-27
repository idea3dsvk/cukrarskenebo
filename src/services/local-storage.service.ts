import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly PRODUCTS_KEY = 'cukrarske-nebo-products';
  private readonly UPLOADED_IMAGES_KEY = 'cukrarske-nebo-uploaded-images';

  // Save products to localStorage
  saveProducts(products: Product[]): void {
    try {
      console.log('Saving products to localStorage:', products);
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
      console.log('Products saved successfully');
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }

  // Load products from localStorage
  loadProducts(): Product[] | null {
    try {
      const stored = localStorage.getItem(this.PRODUCTS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      return null;
    }
  }

  // Save uploaded image data
  saveUploadedImage(productId: string, imageData: string): void {
    try {
      console.log('Saving uploaded image for product:', productId);
      const images = this.getUploadedImages();
      images[productId] = imageData;
      localStorage.setItem(this.UPLOADED_IMAGES_KEY, JSON.stringify(images));
      console.log('Uploaded image saved successfully');
    } catch (error) {
      console.error('Error saving uploaded image:', error);
    }
  }

  // Get uploaded image data
  getUploadedImage(productId: string): string | null {
    try {
      const images = this.getUploadedImages();
      return images[productId] || null;
    } catch (error) {
      console.error('Error getting uploaded image:', error);
      return null;
    }
  }

  // Get all uploaded images
  private getUploadedImages(): Record<string, string> {
    try {
      const stored = localStorage.getItem(this.UPLOADED_IMAGES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading uploaded images:', error);
      return {};
    }
  }

  // Remove uploaded image
  removeUploadedImage(productId: string): void {
    try {
      console.log('Removing uploaded image for product:', productId);
      const images = this.getUploadedImages();
      delete images[productId];
      localStorage.setItem(this.UPLOADED_IMAGES_KEY, JSON.stringify(images));
      console.log('Uploaded image removed successfully');
    } catch (error) {
      console.error('Error removing uploaded image:', error);
    }
  }

  // Clear all data
  clearAll(): void {
    try {
      localStorage.removeItem(this.PRODUCTS_KEY);
      localStorage.removeItem(this.UPLOADED_IMAGES_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Check if localStorage is available
  isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, 'test');
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}