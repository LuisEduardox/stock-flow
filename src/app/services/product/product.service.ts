import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../../models/product/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = inject(HttpClient);
  private apiUrl = `${environment.supabaseUrl}/rest/v1/products`
  private apiKey = `${environment.supabaseKey}`

  private get headers(){
    return{
      'apiKey': this.apiKey,
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=repersentation'
    };
  };

  constructor(){
    this.load();
  }
  
  public products = signal<Product[] | null>([]);

  getProducts() {
    return this.products();
  };

  load(): void{
    this.api.get<Product[]>(this.apiUrl, {headers: this.headers
    }).subscribe({
      next: (products) =>{
        console.log(products);
        this.products.set(products);
      }
    });
  }

  addProduct(newProduct: Product) {
    this.api.post<Product[]>(this.apiUrl, newProduct, {headers: this.headers
    }).subscribe({
      next: (products) =>{
        console.log(products);
        this.products.set([...this.products() ?? [], newProduct]);
      }
    });
  }

  updateProduct(product: Product) {
    this.api.patch<Product[]>(`${this.apiUrl}?id=eq.${product.id}`, product, {headers: this.headers
    }).subscribe({
      next: (products) =>{
        console.log(products);
        this.products.set([...this.products() ?? [], product]);
      }
    });
  }

  deleteProduct(id: string) {
    this.api.delete<Product[]>(`${this.apiUrl}?id=eq.${id}`, {headers: this.headers
    }).subscribe({
      next: (products) =>{
        console.log(products);
        const arr = this.products() || [];
        const updated = arr.filter((p) => p.id !== id);
        this.products.set(updated);
      }
    });
  }

  getProductById(id: string) {
    return this.api.get<Product[]>(`${this.apiUrl}?id=eq.${id}`, {headers: this.headers
    })
  }
}

