import { Component } from '@angular/core';
import { Status, Todo } from '../../models/todo';
import { TODOLIST } from '../../mock/todo';
import { CategoryColor } from 'src/app/models/category';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  todoList: Todo[] = [];

  constructor(
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoService.getTodoList().subscribe(todoList => this.todoList = todoList);
  }

  getStatusName(status: Status): string {
    switch(status) {
      case Status.IS_STARTED:
        return "未着手"
      case Status.IS_PROGRESSIVE:
        return "進行中"
      case Status.IS_COMPLETED:
        return "完了"
      default:
        return "";
    }
  }

}
