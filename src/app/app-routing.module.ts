import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListingComponent} from "./todo-listing/todo-listing.component";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AddNewTodoComponent} from "./add-new-todo/add-new-todo.component";
import {TodoItemEditorComponent} from "./todo-item-editor/todo-item-editor.component";

const routes: Routes = [
  {path: '', component: TodoListingComponent, pathMatch: 'full'},
  {path: 'new', component: AddNewTodoComponent},
  {path: ':id', component: TodoItemComponent},
  {path: ':id/edit', component: TodoItemEditorComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
