import { Injectable, signal } from '@angular/core';

export interface AppError {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: number;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errors = signal<AppError[]>([]);
  private errorCounter = 0;

  getErrors() {
    return this.errors.asReadonly();
  }

  showError(title: string, message: string, autoClose = true): void {
    this.addError('error', title, message, autoClose);
  }

  showWarning(title: string, message: string, autoClose = true): void {
    this.addError('warning', title, message, autoClose);
  }

  showInfo(title: string, message: string, autoClose = true): void {
    this.addError('info', title, message, autoClose);
  }

  showSuccess(title: string, message: string, autoClose = true): void {
    this.addError('success', title, message, autoClose);
  }

  private addError(type: AppError['type'], title: string, message: string, autoClose: boolean): void {
    const error: AppError = {
      id: `error-${++this.errorCounter}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      autoClose
    };

    this.errors.update(errors => [error, ...errors]);

    if (autoClose) {
      setTimeout(() => {
        this.removeError(error.id);
      }, 5000);
    }
  }

  removeError(id: string): void {
    this.errors.update(errors => errors.filter(error => error.id !== id));
  }

  clearAll(): void {
    this.errors.set([]);
  }

  // Global error handler for uncaught errors
  handleGlobalError(error: Error): void {
    console.error('Global error:', error);
    this.showError(
      'Systémová chyba',
      'Vyskytla sa neočakávaná chyba. Skúste obnoviť stránku.',
      false
    );
  }

  // Network error handler
  handleNetworkError(status?: number): void {
    let message = 'Skontrolujte internetové pripojenie a skúste to znovu.';
    
    switch (status) {
      case 404:
        message = 'Požadovaná stránka nebola nájdená.';
        break;
      case 500:
        message = 'Vyskytla sa chyba servera. Skúste to neskôr.';
        break;
      case 0:
        message = 'Nepodarilo sa pripojiť k serveru. Skontrolujte internetové pripojenie.';
        break;
    }

    this.showError('Chyba pripojenia', message);
  }

  // Validation error handler
  handleValidationError(field: string, message: string): void {
    this.showWarning(
      `Chyba vo formulári - ${field}`,
      message
    );
  }
}