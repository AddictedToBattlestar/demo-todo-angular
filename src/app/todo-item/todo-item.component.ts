import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {TodoService} from "../todo.service";
import {Subject, takeUntil} from "rxjs";
import {TodoModel} from "../todo.model";
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  selectedId: null | number = null;

  destroy$: Subject<boolean> = new Subject<boolean>();
  todo: null | TodoModel = null;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {
  }
  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedId != null) {
      this.todoService.getById(this.selectedId).pipe(takeUntil(this.destroy$)).subscribe(data => {
        console.log('todo data:', data);
        this.todo = data;
      });
      this.todoService.setSelectedId(this.selectedId);
    }
  }
}
