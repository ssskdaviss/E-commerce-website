import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductsDetailsComponent } from '../products-details/products-details.component';
import { RouterModule } from '@angular/router';
import { categories } from './categories';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductsDetailsComponent, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: string[] = categories;
  selectedCategory: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.productService.getProducts().subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  filterByCategory(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const category = (target as HTMLSelectElement).value;
      this.selectedCategory = category;
      this.loadProducts();
    }
  }
}
