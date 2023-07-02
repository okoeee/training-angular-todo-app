import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TodoForm } from '../todo/model/form.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoUrl = `${environment.apiUrl}/api/todo`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      catchError(this.handleError<Todo[]>('getTodoList', []))
    );
  }

  addTodoList(todoForm: TodoForm): Observable<TodoForm> {
    return this.http.post<TodoForm>(this.todoUrl, todoForm, this.httpOptions).pipe(
      catchError(this.handleError<TodoForm>('addTodoList'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

}
