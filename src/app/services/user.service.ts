import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/users';  // Backend URL

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, user, { responseType: 'text' as 'json' });
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, user); // Sends credentials to the backend
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }
  
  getUserById(id: number): Observable<User> {  // Fetch a single user, not an array
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}