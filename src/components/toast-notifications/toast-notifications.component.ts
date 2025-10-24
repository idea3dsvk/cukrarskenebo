import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingService, AppError } from '../../services/error-handling.service';

@Component({
  selector: 'app-toast-notifications',
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-4 max-w-sm">
      @for (error of errors(); track error.id) {
        <div 
          class="rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform translate-x-0 opacity-100"
          [class]="getToastClasses(error.type)"
          role="alert"
          [attr.aria-live]="error.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-3">
              @switch (error.type) {
                @case ('error') {
                  <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                }
                @case ('warning') {
                  <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                }
                @case ('info') {
                  <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                }
                @case ('success') {
                  <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                }
              }
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium" [class]="getTitleClasses(error.type)">
                {{ error.title }}
              </h3>
              <p class="mt-1 text-sm" [class]="getMessageClasses(error.type)">
                {{ error.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <button 
                (click)="dismissError(error.id)"
                class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                [class]="getCloseButtonClasses(error.type)"
                [attr.aria-label]="'Zavrieť ' + error.title"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastNotificationsComponent {
  private errorService = inject(ErrorHandlingService);
  
  errors = this.errorService.getErrors();

  dismissError(id: string): void {
    this.errorService.removeError(id);
  }

  getToastClasses(type: AppError['type']): string {
    switch (type) {
      case 'error':
        return 'bg-red-50 border border-red-200';
      case 'warning':
        return 'bg-yellow-50 border border-yellow-200';
      case 'info':
        return 'bg-blue-50 border border-blue-200';
      case 'success':
        return 'bg-green-50 border border-green-200';
      default:
        return 'bg-gray-50 border border-gray-200';
    }
  }

  getTitleClasses(type: AppError['type']): string {
    switch (type) {
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      case 'success':
        return 'text-green-800';
      default:
        return 'text-gray-800';
    }
  }

  getMessageClasses(type: AppError['type']): string {
    switch (type) {
      case 'error':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      case 'info':
        return 'text-blue-700';
      case 'success':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  }

  getCloseButtonClasses(type: AppError['type']): string {
    switch (type) {
      case 'error':
        return 'text-red-400 hover:text-red-500 focus:ring-red-500';
      case 'warning':
        return 'text-yellow-400 hover:text-yellow-500 focus:ring-yellow-500';
      case 'info':
        return 'text-blue-400 hover:text-blue-500 focus:ring-blue-500';
      case 'success':
        return 'text-green-400 hover:text-green-500 focus:ring-green-500';
      default:
        return 'text-gray-400 hover:text-gray-500 focus:ring-gray-500';
    }
  }
}