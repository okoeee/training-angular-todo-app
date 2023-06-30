import { Component } from '@angular/core';
import { Todo } from '../../models/todo';
import { TODOLIST } from '../../mock/todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  todoList: Todo[] = [];

  ngOnInit(): void {
    this.todoList = TODOLIST;
  }

}
