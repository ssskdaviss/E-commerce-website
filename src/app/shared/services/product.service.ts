import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url);
  }
  getProductsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}/category/${category}`;
    return this.http.get<any[]>(url);
  }
}
