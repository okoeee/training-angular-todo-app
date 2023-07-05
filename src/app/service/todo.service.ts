import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, catchError, of } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TodoForm } from '../todo/model/form.model';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoUrl = `${environment.apiUrl}/api/todo`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlingService
  ) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      catchError(this.errorHandlingService.handleError<Todo[]>('getTodoList', []))
    );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todoUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<Todo>('getTodo'))
    );
  }

  addTodoList(todoForm: TodoForm): Observable<TodoForm> {
    return this.http.post<TodoForm>(this.todoUrl, todoForm, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<TodoForm>('addTodoList'))
    )
  }

  updateTodo(id: number, todoForm: TodoForm): Observable<TodoForm> {
    return this.http.put<TodoForm>(`${this.todoUrl}/${id}`, todoForm, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<TodoForm>('updateTodoList'))
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.todoUrl}/${todo.id}`, this.httpOptions).pipe(
      catchError(this.errorHandlingService.handleError<Todo>('deleteTodoList'))
    );
  }

}
