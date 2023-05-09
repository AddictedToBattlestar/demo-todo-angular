import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TodoModel} from "./todo.model";
import {defer, ReplaySubject, Subject, tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  private selectedId = new ReplaySubject<null | number>(1);
  public readonly selectedIdMessages$ = defer(() => this.selectedId.asObservable());
  setSelectedId(id: null | number) {
    console.debug('TodoService.setSelectedId', id);
    this.selectedId.next(id);
  }

  private refreshRequired = new Subject<void>();
  public readonly refreshRequiredMessages$ = defer(() => this.refreshRequired.asObservable());
  getAll() {
    console.debug('TodoService.getAll, making call to get todos');
    return this.http.get<TodoModel[]>("/api/todo");
  }

  getById(id: number) {
    console.debug(`TodoService.getById, making call to get todo ${id}`);
    return this.http.get<TodoModel>(`/api/todo/${id}`);
  }

  save(todo: TodoModel) {
    console.debug(`TodoService.save, making call to save todo`, todo);
    if (todo.id) {
      return this.http.put<TodoModel>(`/api/todo/${todo.id}`, todo).pipe(
        tap(() => this.refreshRequired.next())
      );
    } else {
      return this.http.post<TodoModel>(`/api/todo`, todo).pipe(
        tap(() => this.refreshRequired.next())
      );
    }
  }
}
