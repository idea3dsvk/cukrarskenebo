import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { ProductService } from '../../services/product.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-product-edit-modal',
  imports: [CommonModule, ReactiveFormsModule, ImageUploadComponent],
  template: `
    @if (isModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <header class="flex items-center justify-between p-4 border-b">
            <h2 class="text-2xl font-bold text-gray-800 font-display">Upraviť Produkt</h2>
            <button (click)="closeModal()" class="text-gray-500 hover:text-gray-800" aria-label="Zavrieť">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <form [formGroup]="editForm" (ngSubmit)="onSubmit()" class="max-h-[80vh] overflow-y-auto">
            <div class="p-6 space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Názov produktu</label>
                <input type="text" id="name" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
              </div>
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Cena (€)</label>
                <input type="number" id="price" formControlName="price" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
              </div>
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Kategória</label>
                <input type="text" id="category" formControlName="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Obrázok produktu</label>
                
                <!-- Image Upload Component -->
                <div class="mb-4">
                  <app-image-upload 
                    [currentImageUrl]="editForm.get('imageUrl')?.value || ''"
                    (imageUrlChange)="onImageUrlChange($event)">
                  </app-image-upload>
                </div>
                
                <!-- Manual URL Input (fallback) -->
                <div class="border-t border-gray-200 pt-4">
                  <label for="imageUrl" class="block text-sm font-medium text-gray-600 mb-2">Alebo zadajte URL manuálne</label>
                  <input type="text" id="imageUrl" formControlName="imageUrl" 
                         placeholder="https://example.com/image.jpg"
                         class="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                </div>
              </div>
            </div>
            <footer class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button type="button" (click)="closeModal()" class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Zrušiť
              </button>
              <button type="submit" [disabled]="editForm.invalid" class="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300">
                Uložiť zmeny
              </button>
            </footer>
          </form>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditModalComponent {
  private uiService = inject(UiService);
  private productService = inject(ProductService);
  private fb: FormBuilder = inject(FormBuilder);

  isModalOpen = this.uiService.isProductEditModalOpen;
  private editingProduct = this.uiService.editingProduct;

  editForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const product = this.editingProduct();
      if (product) {
        this.editForm.patchValue(product);
      } else {
        this.editForm.reset();
      }
    });
  }

  onSubmit(): void {
    const currentProduct = this.editingProduct();
    if (this.editForm.valid && currentProduct) {
      const updatedProduct = { ...currentProduct, ...this.editForm.value };
      this.productService.updateProduct(updatedProduct);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.uiService.closeProductEditModal();
  }

  onImageUrlChange(newImageUrl: string): void {
    this.editForm.patchValue({ imageUrl: newImageUrl });
    // Force form to be marked as touched to enable save button
    this.editForm.markAsDirty();
  }
}
