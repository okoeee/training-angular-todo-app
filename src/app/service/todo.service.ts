import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, catchError, of } from 'rxjs';
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

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todoUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError<Todo>('getTodo'))
    );
  }

  addTodoList(todoForm: TodoForm): Observable<TodoForm> {
    return this.http.post<TodoForm>(this.todoUrl, todoForm, this.httpOptions).pipe(
      catchError(this.handleError<TodoForm>('addTodoList'))
    )
  }

  updateTodo(id: number, todoForm: TodoForm): Observable<TodoForm> {
    return this.http.put<TodoForm>(`${this.todoUrl}/${id}`, todoForm, this.httpOptions).pipe(
      catchError(this.handleError<TodoForm>('updateTodoList'))
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.todoUrl}/${todo.id}`).pipe(
      catchError(this.handleError<Todo>('deleteTodoList'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T)
    }
  }

}
