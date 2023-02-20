import {Component, Input} from '@angular/core';
import {TodoModel} from "../todo.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input()
  todos: TodoModel[] = [];
}
