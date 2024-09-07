import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/api/v1/categories';  // Adjust the URL to match your backend

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  getCategoryById(id: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/${id}`);
  }

  saveCategory(category: Category): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}`, category, { responseType: 'text' as 'json' });
  }

  updateCategory(categoryId: number, category: Category): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${categoryId}`, category, { responseType: 'text' as 'json' });
  }


  deleteCategory(categoryId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}${categoryId}`, { responseType: 'text' as 'json' });
  }
}