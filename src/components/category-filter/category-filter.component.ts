import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  template: `
    <div class="flex flex-wrap justify-center gap-2 sm:gap-4">
      @for (category of categories(); track category) {
        <button 
          (click)="selectCategory(category)"
          [class]="getButtonClasses(category)">
          {{ category }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFilterComponent {
  categories = input.required<string[]>();
  selectedCategory = input.required<string>();
  categoryChange = output<string>();

  selectCategory(category: string): void {
    this.categoryChange.emit(category);
  }

  getButtonClasses(category: string): string {
    const baseClasses = 'px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400';
    if (category === this.selectedCategory()) {
      return `${baseClasses} bg-pink-500 text-white shadow-lg`;
    }
    return `${baseClasses} bg-white text-gray-700 hover:bg-pink-100 hover:text-pink-600`;
  }
}
