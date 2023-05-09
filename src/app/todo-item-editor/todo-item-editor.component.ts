import { Component } from '@angular/core';
import { Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoModel} from "../todo.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../todo.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-todo-item-editor',
  templateUrl: './todo-item-editor.component.html',
  styleUrls: ['./todo-item-editor.component.scss']
})
export class TodoItemEditorComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: TodoService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const selectedId = Number(params.get('id'));
      console.debug('TodoItemEditorComponent, route.paramMap change:', selectedId);
      if (selectedId != null) {
        this.todoService.getById(selectedId).pipe(takeUntil(this.destroy$)).subscribe(data => {
          console.debug('TodoItemEditorComponent, todoService.getById result:', data);
          this.buildForm(data);
        });
        this.todoService.setSelectedId(selectedId);
      } else {
        this.buildForm(null);
        this.todoService.setSelectedId(null);
      }
    });
  }

  buildForm(todoBeingEdited: TodoModel | null) {
    if (todoBeingEdited) {
      this.todoForm = this.formBuilder.group({
        id: [todoBeingEdited.id],
        title: [todoBeingEdited.title, [Validators.required]],
        description: [todoBeingEdited.description, [Validators.required, Validators.minLength(10)]],
        dueDate: [todoBeingEdited.dueDate],
        complete: [todoBeingEdited.complete, Validators.required]
      });
    } else {
      this.todoForm = this.formBuilder.group({
        id: [null],
        title: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        dueDate: [null],
        complete: [false, Validators.required]
      });
    }
  }

  todoForm: FormGroup | null = null

  get title() { return this.todoForm?.get('title')!; }
  get description() { return this.todoForm?.get('description')!; }
  onSubmit() {
    console.debug("TodoItemEditorComponent, onSubmit", this.todoForm?.value);
    if (this.todoForm?.valid) {
      const todoBeingEdited = this.todoForm?.value;
      this.todoService.save(todoBeingEdited).pipe(takeUntil(this.destroy$)).subscribe(data => {
        console.debug('TodoItemEditorComponent, todoService.save (success) result:', data);
        this.router.navigate([`/${data.id}`]);
      });
    }
  }
}
