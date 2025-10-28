import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { SearchComponent } from '../search/search.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductCardComponent, CategoryFilterComponent, SearchComponent, PaginationComponent],
})
export class ProductListComponent {
  private productService = inject(ProductService);
  
  products = this.productService.getProducts();
  selectedCategory = signal<string>('Všetky');
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = 20;

  // A set of product IDs that should be loaded with priority.
  // This is based on the initial, unfiltered list and does not change.
  readonly priorityProductIds: Set<string>;

  constructor() {
    this.priorityProductIds = new Set(this.products().slice(0, 10).map((p: Product) => p.id));
  }

  categories = computed(() => {
    const allCategories = this.products().map(p => p.category);
    return ['Všetky', ...new Set(allCategories)];
  });

  filteredProducts = computed(() => {
    const products = this.products();
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase();
    
    let filtered = products;
    
    // Filter by category
    if (category !== 'Všetky') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  });

  paginatedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.currentPage();
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    return filtered.slice(startIndex, endIndex);
  });

  // Responsive grid columns based on number of products in category
  gridColumns = computed(() => {
    const count = this.filteredProducts().length;
    
    // For very few products (1-3), use fewer columns
    if (count === 1) return 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1';
    if (count === 2) return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2';
    if (count === 3) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3';
    if (count <= 5) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4';
    
    // For many products, use full 5-column layout
    return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
  });

  onCategorySelected(category: string): void {
    this.selectedCategory.set(category);
    this.currentPage.set(1); // Reset to first page when category changes
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reset to first page when searching
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
