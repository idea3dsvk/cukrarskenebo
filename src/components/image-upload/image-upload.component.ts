import { Component, ChangeDetectionStrategy, input, output, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-upload',
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-center w-full">
        <label 
          for="dropzone-file" 
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
        >
          @if (previewUrl()) {
            <div class="relative w-full h-full">
              <img [src]="previewUrl()" alt="Preview" class="w-full h-full object-cover rounded-lg">
              <button 
                (click)="removeImage($event)" 
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                aria-label="Odstrániť obrázok"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          } @else {
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              @if (isUploading()) {
                <div class="flex flex-col items-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mb-2"></div>
                  <p class="text-sm text-gray-500">Nahrávanie...</p>
                </div>
              } @else {
                <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Kliknite pre nahratie</span> alebo pretiahnite súbor</p>
                <p class="text-xs text-gray-500">PNG, JPG, JPEG, WebP (MAX. 5MB)</p>
              }
            </div>
          }
          <input 
            id="dropzone-file" 
            type="file" 
            class="hidden" 
            accept="image/*"
            (change)="onFileSelected($event)"
            [disabled]="isUploading()"
          />
        </label>
      </div>
      
      @if (uploadError()) {
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {{ uploadError() }}
        </div>
      }
      
      @if (uploadSuccess()) {
        <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
          Obrázok bol úspešne nahraný!
        </div>
      }
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  currentImageUrl = input<string>('');
  imageUrlChange = output<string>();

  private imageService = inject(ImageService);

  previewUrl = signal<string>('');
  isUploading = signal<boolean>(false);
  uploadError = signal<string>('');
  uploadSuccess = signal<boolean>(false);

  constructor() {
    // Watch for changes in currentImageUrl input
    effect(() => {
      const currentUrl = this.currentImageUrl();
      if (currentUrl && !this.previewUrl()) {
        this.previewUrl.set(currentUrl);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) return;

    this.handleFile(file);
  }

  private uploadFile(file: File): void {
    // Reset states
    this.uploadError.set('');
    this.uploadSuccess.set(false);
    this.isUploading.set(true);

    // Create preview URL immediately using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string;
      this.previewUrl.set(previewUrl);
      
      // Simulate upload process for demo
      setTimeout(() => {
        // For demo purposes, we'll use the preview URL as the "uploaded" URL
        this.isUploading.set(false);
        this.uploadSuccess.set(true);
        
        // Emit the base64 data URL for storage
        this.imageUrlChange.emit(previewUrl);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.uploadSuccess.set(false);
        }, 3000);
      }, 1000); // Simulate 1 second upload time
    };

    reader.onerror = () => {
      this.isUploading.set(false);
      this.uploadError.set('Chyba pri čítaní súboru. Skúste to znovu.');
    };

    reader.readAsDataURL(file);
  }

  private generateMockImageUrl(filename: string): string {
    // In a real app, this would be the actual uploaded file URL from your server
    // For demo purposes, we'll generate a mock URL
    const timestamp = Date.now();
    const cleanFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `https://cdn.cukrarske-nebo.sk/uploads/${timestamp}_${cleanFilename}`;
  }

  removeImage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.previewUrl.set('');
    this.uploadError.set('');
    this.uploadSuccess.set(false);
    this.imageUrlChange.emit('');
    
    // Reset file input
    const input = document.getElementById('dropzone-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.handleFile(file);
    }
  }

  private handleFile(file: File): void {
    // Reset states
    this.uploadError.set('');
    this.uploadSuccess.set(false);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.uploadError.set('Neplatný formát súboru. Podporované sú len PNG, JPG, JPEG a WebP.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      this.uploadError.set('Súbor je príliš veľký. Maximálna veľkosť je 5MB.');
      return;
    }

    this.uploadFile(file);
  }
}