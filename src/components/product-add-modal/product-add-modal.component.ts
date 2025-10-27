import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { ProductService } from '../../services/product.service';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-product-add-modal',
  imports: [CommonModule, ReactiveFormsModule, ImageUploadComponent],
  template: `
    @if (isModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl">
          <header class="flex items-center justify-between p-4 border-b">
            <h2 class="text-2xl font-bold text-gray-800 font-display">Pridať Nový Produkt</h2>
            <button (click)="closeModal()" class="text-gray-500 hover:text-gray-800" aria-label="Zavrieť">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <form [formGroup]="addForm" (ngSubmit)="onSubmit()" class="max-h-[80vh] overflow-y-auto">
            <div class="p-6 space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Názov produktu *</label>
                <input type="text" id="name" formControlName="name" 
                       placeholder="Napr. Zlaté cukrové perličky"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                @if (addForm.get('name')?.invalid && addForm.get('name')?.touched) {
                  <p class="mt-1 text-sm text-red-600">Názov je povinný.</p>
                }
              </div>
              
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Cena (€) *</label>
                <input type="number" id="price" formControlName="price" 
                       placeholder="0.00" step="0.01" min="0"
                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                @if (addForm.get('price')?.invalid && addForm.get('price')?.touched) {
                  <p class="mt-1 text-sm text-red-600">Cena musí byť väčšia alebo rovná 0.</p>
                }
              </div>
              
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Kategória *</label>
                <select id="category" formControlName="category" 
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                  <option value="">-- Vyberte kategóriu --</option>
                  <option value="Meno">Meno</option>
                  <option value="Meno + číslo">Meno + číslo</option>
                  <option value="Figúrky">Figúrky</option>
                  <option value="Číslo">Číslo</option>
                  <option value="Šport">Šport</option>
                  <option value="Deti">Deti</option>
                  <option value="Logo">Logo</option>
                  <option value="Zvieratá">Zvieratá</option>
                  <option value="Krst">Krst</option>
                  <option value="Svadba">Svadba</option>
                  <option value="Láska">Láska</option>
                  <option value="Povolanie / Hobby">Povolanie / Hobby</option>
                  <option value="Zábavné">Zábavné</option>
                </select>
                @if (addForm.get('category')?.invalid && addForm.get('category')?.touched) {
                  <p class="mt-1 text-sm text-red-600">Kategória je povinná.</p>
                }
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Obrázok produktu *</label>
                
                <!-- Image Upload Component -->
                <div class="mb-4">
                  <app-image-upload 
                    [currentImageUrl]="addForm.get('imageUrl')?.value || ''"
                    (imageUrlChange)="onImageUrlChange($event)">
                  </app-image-upload>
                </div>
                
                <!-- Manual URL Input (fallback) -->
                <div class="border-t border-gray-200 pt-4">
                  <label for="imageUrl" class="block text-sm font-medium text-gray-600 mb-2">Alebo zadajte URL manuálne</label>
                  <input type="text" id="imageUrl" formControlName="imageUrl" 
                         placeholder="https://example.com/image.jpg"
                         class="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                  @if (addForm.get('imageUrl')?.invalid && addForm.get('imageUrl')?.touched) {
                    <p class="mt-1 text-sm text-red-600">URL obrázku je povinný.</p>
                  }
                </div>
              </div>
            </div>
            <footer class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button type="button" (click)="closeModal()" class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                Zrušiť
              </button>
              <button type="submit" [disabled]="addForm.invalid" class="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:bg-green-300">
                ➕ Pridať produkt
              </button>
            </footer>
          </form>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddModalComponent {
  private uiService = inject(UiService);
  private productService = inject(ProductService);
  private fb: FormBuilder = inject(FormBuilder);

  isModalOpen = this.uiService.isProductAddModalOpen;

  addForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.addForm.valid) {
      const newProduct = this.addForm.value;
      this.productService.addProduct(newProduct);
      this.addForm.reset({ price: 0, imageUrl: '', name: '', category: '' });
      this.closeModal();
    } else {
      this.addForm.markAllAsTouched();
    }
  }

  closeModal(): void {
    this.addForm.reset({ price: 0, imageUrl: '', name: '', category: '' });
    this.uiService.closeProductAddModal();
  }

  onImageUrlChange(newImageUrl: string): void {
    this.addForm.patchValue({ imageUrl: newImageUrl });
    this.addForm.markAsDirty();
  }
}
