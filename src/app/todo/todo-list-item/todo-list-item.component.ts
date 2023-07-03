import { Component } from '@angular/core';
import { Status, Todo } from '../../models/todo';
import { CategoryColor } from 'src/app/models/category';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  todoList: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private router: Router
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

  deleteTodo(todo: Todo) {
    if(confirm(`${todo.title}を削除しますか`)) {
      this.todoService.deleteTodo(todo).subscribe(
        _ =>
          location.reload()
      );
    }
  }

}
