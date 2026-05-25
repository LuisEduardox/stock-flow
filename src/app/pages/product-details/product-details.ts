import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product/product.model';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CurrencyPipe, UpperCasePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  productId = signal<string | null>(null);
  product = signal<Product | null>(null);
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId.set(id);
    
    if (id) {
      this.productService.getProductById(id).subscribe((products) => {
        if (products[0]) {
          const product = products[0];
          product.id = String(product.id);
          this.product.set(product);
        } else {
          this.product.set(null);
        }
      });
    }
  }

  getStatus(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= 10) return 'Low Stock';
    return 'Available';
  }
}

