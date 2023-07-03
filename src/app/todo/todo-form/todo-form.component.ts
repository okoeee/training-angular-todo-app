import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoForm } from '../model/form.model';
import { TodoService } from 'src/app/service/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  @Input() pageTitle = '';
  @Input() isStatusDisabled: boolean = false;
  @Input() isUpdateMode: boolean = false;
  todoForm: FormGroup;
  categoryOptions: Category[] = [];
  statusOptions = [
    {value: 0, name: '未着手'},
    {value: 1, name: '進行中'},
    {value: 2, name: '完了'},
  ];

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      categoryId: new FormControl(0, Validators.required),
      status: new FormControl(0, Validators.required),
    });
  }

  ngOnInit() {
    this.getCategoryList();
    this.checkFormStatusDisabled();
    if(this.isUpdateMode) {
      this.setFormInitialValueForUpdate();
    }
  }

  onSubmit() {
    if(this.todoForm.invalid) {
      false
    } else {
      const todoFormValue = this.todoForm.value;
      const todoForm: TodoForm = {
        title: todoFormValue.title,
        body: todoFormValue.body,
        categoryId: todoFormValue.categoryId,
        status: todoFormValue.status
      }
      if(this.isUpdateMode) {
        this.updateTodo(todoForm);
      } else {
        this.addTodo(todoForm);
      }
    }
  }

  getCategoryList() {
    this.categoryService.getCategoryList().subscribe(
      categoryList => {
        this.categoryOptions = categoryList
      }
    );
  }

  checkFormStatusDisabled() {
    if(this.isStatusDisabled) {
      this.statusForm.disable();
    }
  }

  setFormInitialValueForUpdate() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodo(id).subscribe(
      todo => {
        this.todoForm.patchValue({
            title: todo.title,
            body: todo.body,
            categoryId: todo.categoryId,
            status: todo.status
          });
      }
    );
  }

  addTodo(todoForm: TodoForm) {
    this.todoService.addTodoList(todoForm).subscribe(
      _ => {
        this.router.navigate(['/']);
      }
      );
    }

  updateTodo(todoForm: TodoForm) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.updateTodo(id, todoForm).subscribe(
      _ => {
        this.router.navigate(['/']);
      }
    );
  }

  get titleForm() {
    return this.todoForm.controls['title'];
  }

  get bodyForm() {
    return this.todoForm.controls['body'];
  }

  get categoryIdForm() {
    return this.todoForm.controls['categoryId'];
  }

  get statusForm() {
    return this.todoForm.controls['status'];
  }

}
