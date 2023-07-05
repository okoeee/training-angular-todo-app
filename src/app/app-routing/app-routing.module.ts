import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoCreateComponent } from '../todo/todo-create/todo-create.component';
import { TodoUpdateComponent } from '../todo/todo-update/todo-update.component';
import { CategoryListComponent } from '../category/category-list/category-list.component';
import { CategoryCreateComponent } from '../category/category-create/category-create.component';
import { CategoryUpdateComponent } from '../category/category-update/category-update.component';
import { AuthGuard } from '../guard/auth.guard';
import { LoginComponent } from '../user/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'todo/create', component: TodoCreateComponent },
  { path: 'todo/update/:id', component: TodoUpdateComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/create', component: CategoryCreateComponent },
  { path: 'category/update/:id', component: CategoryUpdateComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
