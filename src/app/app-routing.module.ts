import { Routes } from '@angular/router';
import { ProductsDetailsComponent } from './features/products-details/products-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent),

  },
  {
    path: 'register',
    loadComponent: () => import('./auth/registration/registration.component')
      .then(m => m.RegistrationComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products.component')
      .then(m => m.ProductsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
   { path: 'product/:id', component: ProductsDetailsComponent},

];


