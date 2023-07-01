import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoUrl = `${environment.apiUrl}/api/todo`;

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      catchError(this.handleError<Todo[]>('getTodoList', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

}
