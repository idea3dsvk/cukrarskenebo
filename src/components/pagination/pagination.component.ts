import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-8">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          (click)="goToPrevious()"
          [disabled]="currentPage() <= 1"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Predchádzajúca
        </button>
        <button
          (click)="goToNext()"
          [disabled]="currentPage() >= totalPages()"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Ďalšia
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Zobrazujú sa produkty <span class="font-medium">{{ startItem() }}</span> až <span class="font-medium">{{ endItem() }}</span> z celkovo <span class="font-medium">{{ totalItems() }}</span>
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <!-- Previous button -->
            <button
              (click)="goToPrevious()"
              [disabled]="currentPage() <= 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              [attr.aria-label]="'Ísť na stránku ' + (currentPage() - 1)"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- Page numbers -->
            @for (page of getPageNumbers(); track page) {
              @if (page === '...') {
                <span class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>
              } @else {
                <button
                  (click)="goToPage(+page)"
                  [class]="getPageButtonClasses(+page)"
                  [attr.aria-current]="currentPage() === +page ? 'page' : null"
                  [attr.aria-label]="'Ísť na stránku ' + page"
                >
                  {{ page }}
                </button>
              }
            }
            
            <!-- Next button -->
            <button
              (click)="goToNext()"
              [disabled]="currentPage() >= totalPages()"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              [attr.aria-label]="'Ísť na stránku ' + (currentPage() + 1)"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  itemsPerPage = input.required<number>();
  
  pageChange = output<number>();

  totalPages = () => Math.ceil(this.totalItems() / this.itemsPerPage());
  startItem = () => (this.currentPage() - 1) * this.itemsPerPage() + 1;
  endItem = () => Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems());

  goToPrevious(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  goToNext(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  getPageNumbers(): (string | number)[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (string | number)[] = [];

    if (total <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 4) {
        pages.push('...');
      }

      // Show current page and surrounding pages
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 3) {
        pages.push('...');
      }

      // Always show last page
      if (total > 1) {
        pages.push(total);
      }
    }

    return pages;
  }

  getPageButtonClasses(page: number): string {
    const baseClasses = 'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0';
    
    if (page === this.currentPage()) {
      return `${baseClasses} bg-pink-600 text-white focus:bg-pink-700`;
    }
    
    return `${baseClasses} text-gray-900 hover:bg-gray-50`;
  }
}