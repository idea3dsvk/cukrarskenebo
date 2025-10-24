import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Fix: Import FormGroup for explicit typing.
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { CartService } from '../../services/cart.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-checkout-form',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <aside class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
           [class.translate-x-0]="isCheckoutOpen()"
           [class.translate-x-full]="!isCheckoutOpen()">
      <div class="flex flex-col h-full">
        <header class="flex items-center justify-between p-4 border-b">
          <h2 class="text-2xl font-bold text-gray-800 font-display">Objednávka</h2>
          <button (click)="closeCheckout()" class="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Zavrieť objednávku">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="flex-grow flex flex-col">
          <div class="overflow-y-auto p-6 space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Meno a priezvisko</label>
              <input type="text" id="name" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
              @if (isInvalid('name')) {
                <p class="mt-1 text-sm text-red-600">Toto pole je povinné.</p>
              }
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
              <input type="email" id="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
              @if (isInvalid('email')) {
                <p class="mt-1 text-sm text-red-600">Zadajte platný e-mail.</p>
              }
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">Telefón</label>
              <input type="tel" id="phone" formControlName="phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
               @if (isInvalid('phone')) {
                <p class="mt-1 text-sm text-red-600">Toto pole je povinné.</p>
              }
            </div>
            <div>
              <label for="street" class="block text-sm font-medium text-gray-700">Ulica a číslo</label>
              <input type="text" id="street" formControlName="street" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
               @if (isInvalid('street')) {
                <p class="mt-1 text-sm text-red-600">Toto pole je povinné.</p>
              }
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="sm:col-span-2">
                <label for="city" class="block text-sm font-medium text-gray-700">Mesto</label>
                <input type="text" id="city" formControlName="city" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                @if (isInvalid('city')) {
                  <p class="mt-1 text-sm text-red-600">Povinné.</p>
                }
              </div>
              <div>
                <label for="zip" class="block text-sm font-medium text-gray-700">PSČ</label>
                <input type="text" id="zip" formControlName="zip" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                @if (isInvalid('zip')) {
                  <p class="mt-1 text-sm text-red-600">Povinné.</p>
                }
              </div>
            </div>
          </div>

          <footer class="border-t border-gray-200 p-4 mt-auto">
            <div class="flex justify-between">
                <button type="button" (click)="backToCart()" class="rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                  Späť do košíka
                </button>
                <button type="submit" [disabled]="checkoutForm.invalid || isSubmitting()" class="rounded-md border border-transparent bg-pink-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed transition-colors">
                  @if (isSubmitting()) {
                    <span class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Odosielam...
                    </span>
                  } @else {
                    Odoslať objednávku
                  }
                </button>
            </div>
          </footer>
        </form>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutFormComponent {
  private uiService = inject(UiService);
  private cartService = inject(CartService);
  private emailService = inject(EmailService);
  // Fix: Explicitly type FormBuilder to fix type inference issue where `fb` was considered `unknown`.
  private fb: FormBuilder = inject(FormBuilder);

  isCheckoutOpen = this.uiService.isCheckoutOpen;
  isSubmitting = signal<boolean>(false);

  // Fix: Add explicit FormGroup type for better type safety and clarity.
  checkoutForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
  });

  isInvalid(controlName: string): boolean {
    const control = this.checkoutForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  closeCheckout(): void {
    this.uiService.closeCheckout();
  }

  backToCart(): void {
    this.uiService.backToCart();
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      
      try {
        const formData = this.checkoutForm.value;
        const cartItems = this.cartService.cartItems();
        
        // Generovanie čísla objednávky
        const orderNumber = this.generateOrderNumber();
        
        // Príprava dát pre email
        const orderData = {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: `${formData.street}, ${formData.city} ${formData.zip}`,
          items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            total: item.price * item.quantity
          })),
          totalAmount: this.cartService.cartTotal(),
          orderNumber: orderNumber,
          orderDate: new Date().toLocaleString('sk-SK')
        };

        console.log('Odosielam objednávku:', orderData);

        // Odoslanie emailu cez EmailJS
        const emailSent = await this.emailService.sendOrderEmail(orderData);
        
        if (emailSent) {
          alert(`Ďakujeme za vašu objednávku!\n\nČíslo objednávky: ${orderNumber}\n\nPotvrdenie objednávky bolo odoslané na váš email.`);
          this.cartService.clearCart();
          this.checkoutForm.reset();
          this.uiService.closeCheckout();
        } else {
          alert('Nastala chyba pri odosielaní objednávky. Prosím skúste to znovu alebo nás kontaktujte priamo.');
        }
        
      } catch (error) {
        console.error('Chyba pri spracovaní objednávky:', error);
        alert('Nastala neočakávaná chyba. Prosím skúste to znovu.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  private generateOrderNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `CN${year}${month}${day}${hours}${minutes}${random}`;
  }
}
