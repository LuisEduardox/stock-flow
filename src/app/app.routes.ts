import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductForm } from './pages/product-form/product-form';
import { ProductDetails } from './pages/product-details/product-details';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'product-form', component: ProductForm },
  { path: 'product-form/:id', component: ProductForm },
  { path: 'product-details/:id', component: ProductDetails },
];
