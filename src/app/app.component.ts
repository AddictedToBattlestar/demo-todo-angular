import {Component} from '@angular/core';
import {Observable} from "rxjs";
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

  todos$: Observable<TodoModel[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getAll();
    this.todoService.refreshRequiredMessages$.subscribe(() => {
      console.debug('AppComponent, todoService.refreshRequiredMessages$ received');
      this.todos$ = this.todoService.getAll();
    });
  }
}
