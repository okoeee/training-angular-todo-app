import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoListItemComponent } from './todo/todo-list-item/todo-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoCreateComponent } from './todo/todo-create/todo-create.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoUpdateComponent } from './todo/todo-update/todo-update.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryListItemComponent } from './category/category-list-item/category-list-item.component';
import { HeaderComponent } from './views/header/header.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { LoginComponent } from './user/login/login.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './user/store/state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoCreateComponent,
    TodoFormComponent,
    TodoUpdateComponent,
    CategoryListComponent,
    CategoryListItemComponent,
    HeaderComponent,
    CategoryCreateComponent,
    CategoryFormComponent,
    CategoryUpdateComponent,
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    NgxsModule.forRoot([
      UserState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
