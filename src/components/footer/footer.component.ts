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
            <a href="https://idea3dsvk.github.io/idea3d/" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-pink-500 transition-colors text-sm underline">
              3D modelovanie: výrobky na mieru...
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
