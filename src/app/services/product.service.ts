import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/products';  

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

    // Method to save a product with FormData
  saveProduct(productData: FormData): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, productData, { responseType: 'text' as 'json' });
  }


  // Update an existing batch in the backend
  updateProduct(productData: FormData, productId: number): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${productId}`, productData, { responseType: 'text' as 'json' });
  }

  //delete the data
  deleteProduct(productId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${productId}`, { responseType: 'text' as 'json' });
  }
}
