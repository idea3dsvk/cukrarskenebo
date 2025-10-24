import { Injectable, signal } from '@angular/core';

export interface ImageUploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private isUploading = signal<boolean>(false);

  getUploadStatus() {
    return this.isUploading.asReadonly();
  }

  async uploadImage(file: File): Promise<ImageUploadResult> {
    this.isUploading.set(true);

    try {
      // Validate file
      const validation = this.validateImageFile(file);
      if (!validation.valid) {
        this.isUploading.set(false);
        return { success: false, error: validation.error };
      }

      // In a real application, you would upload to your server or cloud storage
      // For demo purposes, we'll simulate the upload process
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock URL (in real app, this would come from your upload service)
      const mockUrl = this.generateImageUrl(file);
      
      this.isUploading.set(false);
      return { success: true, imageUrl: mockUrl };

    } catch (error) {
      this.isUploading.set(false);
      return { 
        success: false, 
        error: 'Nastala chyba pri nahrávaní obrázka. Skúste to znovu.' 
      };
    }
  }

  private validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Neplatný formát súboru. Podporované sú len PNG, JPG, JPEG a WebP.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Súbor je príliš veľký. Maximálna veľkosť je 5MB.'
      };
    }

    return { valid: true };
  }

  private generateImageUrl(file: File): string {
    // In a real application, this would be the actual URL from your server/CDN
    // For demo purposes, we'll create a mock URL
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const randomId = Math.random().toString(36).substring(2, 15);
    
    return `https://cdn.cukrarske-nebo.sk/uploads/${timestamp}_${randomId}.${fileExtension}`;
  }

  // Utility method to create preview URL for immediate display
  createPreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        resolve(result);
      };
      reader.onerror = () => {
        reject('Chyba pri čítaní súboru');
      };
      reader.readAsDataURL(file);
    });
  }

  // Method to compress image if needed (optional enhancement)
  async compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file); // Return original if compression fails
          }
        }, file.type, quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}