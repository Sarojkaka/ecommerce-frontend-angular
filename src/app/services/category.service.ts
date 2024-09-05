import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/category';  // Adjust the URL to match your backend

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/all`);
  }

  getCategoryById(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/${id}`);
  }

  saveCategory(category: Category): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/save`, category, { responseType: 'text' as 'json' });
  }

  updateCategory(categoryId: number, category: Category): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}/update/${categoryId}`, category, { responseType: 'text' as 'json' });
  }


  deleteCategory(categoryId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${categoryId}`, { responseType: 'text' as 'json' });
  }
}