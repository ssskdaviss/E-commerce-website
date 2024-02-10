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
  searchQuery: string = '';
  filteredProducts: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadAllProducts();

  }
  loadAllProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
 
  filterByCategory(target: EventTarget | null) {
    if (target instanceof HTMLSelectElement) {
      const category = (target as HTMLSelectElement).value;
      this.selectedCategory = category;
      this.loadAllProducts();
    }
  }
  searchProducts() {
    this.applyFilters();
  }
  
  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      // Filter by category
      if (this.selectedCategory && product.category !== this.selectedCategory) {
        return false;
      }
      // Filter by search query
      if (this.searchQuery && !product.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }
}
