import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { DataExportService } from '../../services/data-export.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule],
  template: `
    @if (isAdmin()) {
      <div class="fixed bottom-4 right-4 z-40">
        <!-- Floating Admin Button -->
        <button 
          (click)="togglePanel()"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Admin panel">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <!-- Admin Panel -->
        @if (isPanelOpen()) {
          <div class="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl p-6 w-96 max-h-[80vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">Admin Panel</h3>
              <button (click)="togglePanel()" class="text-gray-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-3">
              <!-- Export Section -->
              <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 class="font-semibold text-blue-900 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export zmien
                </h4>
                <p class="text-sm text-gray-600 mb-3">
                  Po zmene obrázkov stiahnite súbor a nahrajte ho do projektu.
                </p>
                <button 
                  (click)="exportProducts()"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  📥 Stiahnuť products.json
                </button>
                <button 
                  (click)="exportInstructions()"
                  class="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  📋 Stiahnuť návod
                </button>
              </div>

              <!-- Email Test Section -->
              <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 class="font-semibold text-green-900 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Test EmailJS
                </h4>
                <button 
                  (click)="testEmail()"
                  [disabled]="isTestingEmail()"
                  class="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  @if (isTestingEmail()) {
                    <span class="flex items-center justify-center">
                      <svg class="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Odosielam...
                    </span>
                  } @else {
                    ✉️ Odoslať testovací email
                  }
                </button>
                @if (emailTestResult()) {
                  <p class="mt-2 text-sm" [class.text-green-600]="emailTestResult() === 'success'" [class.text-red-600]="emailTestResult() === 'error'">
                    {{ emailTestResult() === 'success' ? '✅ Email úspešne odoslaný!' : '❌ Chyba pri odosielaní emailu' }}
                  </p>
                }
              </div>

              <!-- Products Reset Section -->
              <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 class="font-semibold text-yellow-900 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset produktov
                </h4>
                <p class="text-sm text-yellow-700 mb-3">
                  Obnoví predvolené obrázky a nastavenia.
                </p>
                <button 
                  (click)="resetProducts()"
                  class="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  🔄 Obnoviť predvolené
                </button>
              </div>

              <!-- Info Section -->
              <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-gray-900 mb-2">ℹ️ Informácie</h4>
                <p class="text-xs text-gray-600 leading-relaxed">
                  <strong>Zmeny obrázkov:</strong> Export → Commit do Git → Push<br>
                  <strong>LocalStorage:</strong> Zmeny viditeľné len lokálne<br>
                  <strong>Globálne zmeny:</strong> Vyžadujú commit a rebuild
                </p>
              </div>
            </div>
          </div>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private dataExportService = inject(DataExportService);
  private emailService = inject(EmailService);

  isAdmin = this.authService.isAdmin;
  isPanelOpen = signal(false);
  isTestingEmail = signal(false);
  emailTestResult = signal<'success' | 'error' | null>(null);

  togglePanel(): void {
    this.isPanelOpen.update(v => !v);
  }

  exportProducts(): void {
    const products = this.productService.getProducts()();
    this.dataExportService.exportProductsToFile(products);
    alert('✅ Súbor products.json bol stiahnutý!\n\nĎalší krok:\n1. Nahrajte súbor do src/data/products.json\n2. Commitnite: git add . && git commit -m "Update products"\n3. Pushite: git push');
  }

  exportInstructions(): void {
    this.dataExportService.exportDeploymentInstructions();
  }

  async testEmail(): Promise<void> {
    this.isTestingEmail.set(true);
    this.emailTestResult.set(null);
    
    try {
      const success = await this.emailService.testEmailService();
      this.emailTestResult.set(success ? 'success' : 'error');
    } catch (error) {
      this.emailTestResult.set('error');
    } finally {
      this.isTestingEmail.set(false);
    }
  }

  resetProducts(): void {
    if (confirm('Naozaj chcete obnoviť predvolené produkty? Všetky lokálne zmeny budú stratené.')) {
      this.productService.resetProducts();
      alert('✅ Produkty boli obnovené na predvolené hodnoty.');
    }
  }
}
