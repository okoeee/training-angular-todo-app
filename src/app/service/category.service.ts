import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { CategoryForm } from '../category/model/form.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = `${environment.apiUrl}/api/category`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      catchError(this.handleError<Category[]>('getCategoryList', []))
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Category>('getCategory'))
    );
  }

  addCategory(categoryForm: CategoryForm): Observable<CategoryForm> {
    return this.http.post<CategoryForm>(this.categoryUrl, categoryForm, this.httpOptions).pipe(
      catchError(this.handleError<CategoryForm>('addCategory'))
    );
  }

  updateCategory(id: number, categoryForm: CategoryForm): Observable<CategoryForm> {
    return this.http.put<CategoryForm>(`${this.categoryUrl}/${id}`, categoryForm, this.httpOptions).pipe(
      catchError(this.handleError<CategoryForm>('updateCategory'))
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.categoryUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Category>('deleteCategory'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any, caught: Observable<T>): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      if (error.status === 0) {
        console.error('An error occurred:', error.error.message);
      // サーバー側から返却されるエラー
      } else {
        console.error(`Backend returned code ${error.status}, body was: `, error.error.message);
      }
      return of(result as T)
    }
  }
}
