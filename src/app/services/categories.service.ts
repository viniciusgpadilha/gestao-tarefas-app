import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import test from 'node:test';

export interface Category {
  id: number;
  title: string;
  description: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable <Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: number): Observable <Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`)
  }

  createCategory(category: Category): Observable <Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories/store`, category)
  }

  updateCategory(id: number, category: Category): Observable <Category> {
    return this.http.put<Category>(`${this.apiUrl}/categories/update/${id}`, category)
  }
}
