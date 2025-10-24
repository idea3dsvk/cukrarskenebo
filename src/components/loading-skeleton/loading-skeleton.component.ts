import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  template: `
    @switch (type()) {
      @case ('product-card') {
        <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div class="h-48 bg-gray-200"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
              <div class="flex space-x-2">
                <div class="h-6 w-6 bg-gray-200 rounded-full"></div>
                <div class="h-6 w-6 bg-gray-200 rounded-full"></div>
                <div class="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 rounded w-1/4"></div>
              <div class="flex space-x-2">
                <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div class="flex justify-between items-center pt-4">
              <div class="h-6 bg-gray-200 rounded w-16"></div>
              <div class="h-8 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      }
      @case ('product-grid') {
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 mt-8">
          @for (item of Array(count()); track $index) {
            <app-loading-skeleton type="product-card"></app-loading-skeleton>
          }
        </div>
      }
      @case ('search-bar') {
        <div class="max-w-md mx-auto mb-8">
          <div class="h-12 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      }
      @case ('category-filter') {
        <div class="flex flex-wrap justify-center gap-2 sm:gap-4 animate-pulse">
          @for (item of Array(8); track $index) {
            <div class="h-10 bg-gray-200 rounded-full w-20"></div>
          }
        </div>
      }
      @case ('cart-item') {
        <div class="flex py-4 animate-pulse">
          <div class="h-24 w-24 bg-gray-200 rounded-md"></div>
          <div class="ml-4 flex flex-1 flex-col space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="flex justify-between items-end">
              <div class="h-8 bg-gray-200 rounded w-20"></div>
              <div class="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      }
      @default {
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      }
    }
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSkeletonComponent {
  type = input<'product-card' | 'product-grid' | 'search-bar' | 'category-filter' | 'cart-item' | 'default'>('default');
  count = input<number>(12);

  protected readonly Array = Array;
}