import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TODOLIST } from '../mock/todo';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodoList(): Observable<Todo[]> {
    const todoList = TODOLIST;
    return of(todoList)
  }

}
