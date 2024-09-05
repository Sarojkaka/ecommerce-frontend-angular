import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/product';  

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

    // Method to save a product with FormData
  saveProduct(productData: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/save`, productData, { responseType: 'text' as 'json' });
  }


  // Update an existing batch in the backend
  updateProduct(productData: FormData, productId: number): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}/update/${productId}`, productData, { responseType: 'text' as 'json' });
  }

  deleteProduct(productId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${productId}`, { responseType: 'text' as 'json' });
  }
}
