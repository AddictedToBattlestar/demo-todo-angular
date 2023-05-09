import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {TodoService} from "../todo.service";
import {Observable} from "rxjs";
import {TodoModel} from "../todo.model";
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  todo$: Observable<TodoModel> | null = null;
  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let selectedId = Number(params.get('id'));
      console.debug('TodoItemComponent, route.paramMap change:', selectedId);
      if (selectedId != null) {
        this.todo$ = this.todoService.getById(selectedId)
      } else {
        this.todo$ = null;
      }
      this.todoService.setSelectedId(selectedId);
    });
  }
}
