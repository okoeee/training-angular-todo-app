import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { CategoryForm } from '../category/model/form.model';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = `${environment.apiUrl}/api/category`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl).pipe(
      catchError(this.errorHandlingService.handleError<Category[]>('getCategoryList', []))
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.categoryUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<Category>('getCategory'))
    );
  }

  addCategory(categoryForm: CategoryForm): Observable<CategoryForm> {
    return this.http.post<CategoryForm>(this.categoryUrl, categoryForm, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<CategoryForm>('addCategory'))
    );
  }

  updateCategory(id: number, categoryForm: CategoryForm): Observable<CategoryForm> {
    return this.http.put<CategoryForm>(`${this.categoryUrl}/${id}`, categoryForm, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<CategoryForm>('updateCategory'))
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.categoryUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<Category>('deleteCategory'))
    );
  }

}
