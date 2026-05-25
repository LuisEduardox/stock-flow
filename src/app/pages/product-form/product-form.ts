import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product/product.model';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  productForm: FormGroup;
  isEdit = signal(false);
  productId = signal<string | null>(null);

  constructor() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId.set(id);
      const product = this.productService.getProductById(id).subscribe({
        next: (products) => {
        console.log(products);
        const product = products[0];
        if (product) {
          this.productForm.patchValue(product);
        }
      }
    });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.isEdit()) {
        this.productService.updateProduct({ ...productData, id: this.productId()! });
      } else {
        this.productService.addProduct(productData);
      }
      this.router.navigate(['/dashboard']);
    }
  }
}
