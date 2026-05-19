import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products = signal<Product[] | null>([
    {
      id: '1',
      name: 'MacBook Pro 16"',
      category: 'Electronics',
      price: 2499,
      quantity: 142,
      description: 'M3 Max chip, 64GB RAM, 2TB SSD',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBMabxOP6WvpLQTKXuq4K2Sn0sJAUSOj8nMph2gWyL_oPLSey2Kb3BhAUbgs-SqQkbB3f3yh_nLFU5zaILnB3OoJdzUIQodZdWYdtzevBcDhP2GS4ONY-PdG3Rr9FtVBRu6rfstrk1Xd9M2qCbA7FWmodSuT0gBfGA2JVWRfm7eaJOa2KWEe4we84az_irAE-zgeu391qwR76OCq0R2LJIkjJ2sxAOSAynQ0tm9aOJGWioj4zT94vSUfcFOZpT3ArHDE9kNXhv9WVA',
    },
    {
      id: '2',
      name: 'AirPods Pro Gen 2',
      category: 'Electronics',
      price: 249,
      quantity: 12,
      description: 'Active Noise Cancellation, MagSafe Case',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJoAnBIiWWuGbPGW2XvDYy1DmUw3F4NpWfsecAmLEIkId1BF5w4C_sBER8NAIg5l5-YwLK8RwdxvEpU0WMUPiQ5naPIg1EehBc6bRmOVzVz1N49f9rHArUI9PXnZUSXJTpl0y8nCDGrXrJTMwiSDu3SC_LKJkPuU5PjuYANgZGBf0kYDQrrRfkQFzsdQAufltLTOHCj9pBQ7cEU03EeIu0w911WS9dqzfnCVUAarMtL2Yv1RkYFaCdr4jwuQ-Tsq6RosXuIC4MI4',
    },
    {
      id: '3',
      name: 'Ergonomic Office Chair',
      category: 'Home & Office',
      price: 399,
      quantity: 0,
      description: 'Mesh back, adjustable lumbar support',
      imageUrl: '',
    },
    {
      id: '4',
      name: 'Nike Air Max 270',
      category: 'Apparel',
      price: 150,
      quantity: 85,
      description: 'Lifestyle shoe with large Air unit',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCMGMtWg9dafLsfx5Vbwy51d-t_7p2w2-7ZbqL0raICF_l4on1yAyYLILoBkmEPNMhFUNPRIpzwiLCO3YPXHmKd8coOwgYKdU13qlbB6SIiVui3OYbEkEA7g-od-zRiDsxaoS-7FzmD16ZF1IjGRcEGZLU5rsYmamGDQFVAl0ayr5eE5UNzaA6cbiXfkXURhXlHhMXuaKvs3crmupRX4sZqRMxWtI',
    },
  ]);

  getProducts() {
    return this.products();
  }

  addProduct(product: Product) {
    const arr = this.products() || [];
    const lastId = arr.length > 0 ? parseInt(arr[arr.length - 1].id || '0', 10) : 0;
    const newProduct = { ...product, id: String(lastId + 1) };
    this.products.set([...arr, newProduct]);
  }

  updateProduct(product: Product) {
    const arr = this.products() || [];
    const updated = arr.map((p) =>
      p.id === product.id ? product : p
    );
    this.products.set(updated);
  }

  deleteProduct(id: string) {
    const arr = this.products() || [];
    const updated = arr.filter((p) => p.id !== id);
    this.products.set(updated);
  }

  getProductById(id: string) {
    return this.products()?.find((p) => p.id === id);
  }
}

