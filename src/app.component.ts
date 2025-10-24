import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { UiService } from './services/ui.service';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { ProductEditModalComponent } from './components/product-edit-modal/product-edit-modal.component';
import { ToastNotificationsComponent } from './components/toast-notifications/toast-notifications.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    ProductListComponent,
    FooterComponent,
    CartViewComponent,
    CheckoutFormComponent,
    LoginModalComponent,
    ProductEditModalComponent,
    ToastNotificationsComponent,
    AdminPanelComponent,
  ],
})
export class AppComponent {
  private uiService = inject(UiService);
  isCartOpen = this.uiService.isCartOpen;
  isCheckoutOpen = this.uiService.isCheckoutOpen;
  isLoginModalOpen = this.uiService.isLoginModalOpen;
  isProductEditModalOpen = this.uiService.isProductEditModalOpen;

  closePanels(): void {
    this.uiService.closeAllPanels();
  }
}
