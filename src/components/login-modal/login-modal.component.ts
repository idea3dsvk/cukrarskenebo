import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule],
  template: `
    @if (isLoginModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
          <header class="flex items-center justify-between pb-4 border-b">
            <h2 class="text-2xl font-bold text-gray-800 font-display">Admin Login</h2>
            <button (click)="closeModal()" class="text-gray-500 hover:text-gray-800" aria-label="Zavrieť">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <form (ngSubmit)="handleLogin()" class="mt-4">
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Heslo</label>
              <input type="password" id="password" name="password" [(ngModel)]="password"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
            </div>
            @if (errorMessage()) {
              <p class="mt-2 text-sm text-red-600">{{ errorMessage() }}</p>
            }
            <div class="mt-6">
              <button type="submit" [disabled]="isLoading()" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-300 disabled:cursor-not-allowed">
                @if (isLoading()) {
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Prihlasovanie...
                } @else {
                  Prihlásiť sa
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
  private uiService = inject(UiService);
  private authService = inject(AuthService);

  isLoginModalOpen = this.uiService.isLoginModalOpen;
  password = '';
  errorMessage = signal('');
  isLoading = signal(false);

  handleLogin(): void {
    if (this.isLoading()) return;
    
    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simulate network delay for better UX
    setTimeout(() => {
      if (this.authService.login(this.password)) {
        this.closeModal();
      } else {
        const remainingLockout = this.authService.getRemainingLockoutTime();
        if (remainingLockout > 0) {
          const minutes = Math.ceil(remainingLockout / 60000);
          this.errorMessage.set(`Príliš veľa neúspešných pokusov. Skúste znovu za ${minutes} minút.`);
        } else {
          const attempts = this.authService.getLoginAttempts();
          const remaining = 3 - attempts;
          if (remaining > 0) {
            this.errorMessage.set(`Nesprávne heslo. Zostávajú ${remaining} pokusy.`);
          } else {
            this.errorMessage.set('Nesprávne heslo. Skúste to znova.');
          }
        }
      }
      this.isLoading.set(false);
    }, 300);
  }

  closeModal(): void {
    this.password = '';
    this.errorMessage.set('');
    this.uiService.closeLoginModal();
  }
}
