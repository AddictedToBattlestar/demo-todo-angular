import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListingComponent} from "./todo-listing/todo-listing.component";
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', component: TodoListingComponent, pathMatch: 'full'},
  {path: ':id', component: TodoItemComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
