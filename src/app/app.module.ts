import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListingComponent } from './todo-listing/todo-listing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {HttpClientModule} from "@angular/common/http";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddNewTodoComponent } from './add-new-todo/add-new-todo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoItemEditorComponent } from './todo-item-editor/todo-item-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListingComponent,
    PageNotFoundComponent,
    TodoItemComponent,
    NavBarComponent,
    AddNewTodoComponent,
    TodoItemEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
