import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="bg-white mt-12">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col items-center text-center">
          <a href="#" class="text-2xl font-bold text-pink-500 font-display">
            Cukrárske Nebo
          </a>
          <p class="max-w-md mx-auto mt-4 text-gray-500">
            Prinášame radosť do vašich kuchýň s tými najkrajšími ozdobami na torty a cukrovinky.
          </p>

          <!-- New Size Information Section -->
          <div class="max-w-md mx-auto mt-5 text-sm text-gray-600 border-t border-gray-200 pt-4 w-full">
            <p class="font-semibold text-gray-700">Približné rozmery našich produktov:</p>
            <div class="flex justify-center space-x-4 sm:space-x-6 mt-2">
              <span><strong>S:</strong> ~90x90 mm</span>
              <span><strong>M:</strong> ~140x140 mm</span>
              <span><strong>L:</strong> ~200x200 mm</span>
            </div>
          </div>

          <div class="flex justify-center mt-6">
            <a href="#" class="mx-3 text-gray-500 hover:text-pink-500 transition-colors" aria-label="Facebook">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
            </a>
            <a href="#" class="mx-3 text-gray-500 hover:text-pink-500 transition-colors" aria-label="Instagram">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.359-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.359-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
            </a>
          </div>
           @if(!isAdmin()) {
            <button (click)="openLoginModal()" class="mt-4 text-gray-500 hover:text-pink-500 text-sm underline">
              Administrátorský panel
            </button>
          } @else {
            <div class="mt-4 space-x-4">
              <button (click)="testEmail()" class="text-gray-500 hover:text-blue-500 text-xs underline">
                Test Email
              </button>
              <button (click)="resetProducts()" class="text-gray-500 hover:text-red-500 text-xs underline">
                Reset produktov
              </button>
            </div>
          }
        </div>
        <hr class="my-6 border-gray-200" />
        <p class="text-center text-gray-400">© 2025 Cukrárske Nebo. by PoRast</p>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private uiService = inject(UiService);
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private emailService = inject(EmailService);
  isAdmin = this.authService.isAdmin;

  openLoginModal(): void {
    this.uiService.openLoginModal();
  }

  async testEmail(): Promise<void> {
    try {
      const success = await this.emailService.testEmailService();
      if (success) {
        alert('Test email bol úspešne odoslaný! Skontrolujte svoju EmailJS konzolu a email.');
      } else {
        alert('Test email sa nepodarilo odoslať. Skontrolujte EmailJS konfiguráciu v email.service.ts a config/email.config.ts');
      }
    } catch (error) {
      console.error('Chyba pri teste emailu:', error);
      alert('Nastala chyba pri teste emailu. Skontrolujte konzolu pre detaily.');
    }
  }

  resetProducts(): void {
    if (confirm('Naozaj chcete resetovať všetky produkty na pôvodný stav? Táto akcia je nevratná.')) {
      this.productService.resetProducts();
      alert('Produkty boli resetované!');
    }
  }
}
