import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CurrencyPipe, DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private productService = inject(ProductService);

  searchTerm = signal('');

  filteredProducts() {
    const products = this.productService.products() || [];
    const term = this.searchTerm().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  totalProducts() {
    return this.productService.products()?.length || 0;
  }

  lowStockCount() {
    return (
      this.productService.products()?.filter((p) => p.quantity > 0 && p.quantity <= 10)
        .length || 0
    );
  }

  criticalStockCount() {
    return this.productService.products()?.filter((p) => p.quantity === 0).length || 0;
  }

  totalValue() {
    return (
      this.productService
        .products()
        ?.reduce((acc, p) => acc + p.price * p.quantity, 0) || 0
    );
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id);
    }
  }

  getStatus(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= 10) return 'Low Stock';
    return 'Available';
  }
}

