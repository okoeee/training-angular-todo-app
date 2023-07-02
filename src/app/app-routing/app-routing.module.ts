import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoCreateComponent } from '../todo/todo-create/todo-create.component';
import { TodoUpdateComponent } from '../todo/todo-update/todo-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/create', component: TodoCreateComponent },
  { path: 'todo/update/:id', component: TodoUpdateComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
