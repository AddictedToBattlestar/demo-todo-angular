import {Component, Input, OnInit} from '@angular/core';
import {TodoModel} from "../todo.model";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input()
  todos: TodoModel[] = [];

  selectedId: null | number = null;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.selectedIdMessages$.subscribe(newSelectedId => {
      console.debug('NavBarComponent.ngOnInit, todoService.selectedId.subscribe - newSelectedId', newSelectedId);
      this.selectedId = newSelectedId;
    });
  }
}
