import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  template: `
    <div class="relative max-w-md mx-auto mb-8">
      <div class="relative">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onSearchChange()"
          placeholder="Hľadajte produkty..."
          class="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm transition-all duration-200"
          [attr.aria-label]="'Hľadať v ' + totalProducts() + ' produktoch'"
        >
        <div class="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        @if (searchQuery()) {
          <button
            (click)="clearSearch()"
            class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Vymazať vyhľadávanie"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        }
      </div>
      @if (searchQuery() && resultsCount() !== null) {
        <div class="mt-2 text-sm text-gray-600 text-center">
          @if (resultsCount()! > 0) {
            Nájdených {{ resultsCount() }} produktov
          } @else {
            Nenašli sa žiadne produkty pre "{{ searchQuery() }}"
          }
        </div>
      }
    </div>
  `,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  totalProducts = input<number>(0);
  resultsCount = input<number | null>(null);
  searchChange = output<string>();

  searchQuery = signal('');

  onSearchChange(): void {
    this.searchChange.emit(this.searchQuery());
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.onSearchChange();
  }
}