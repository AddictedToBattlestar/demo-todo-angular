import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {TodoModel} from "./todo.model";
import {TodoService} from "./todo.service";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faPlus = faPlus;

  title = 'demo-todo-angular';

  destroy$: Subject<boolean> = new Subject<boolean>();

  todos: TodoModel[] = [];

  constructor(private todoService: TodoService) {
    this.todoService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.debug('AppComponent, todoService.getAll result:', data);
      this.todos = data;
    });
  }
}
