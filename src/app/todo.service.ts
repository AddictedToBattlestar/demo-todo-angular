import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TodoModel} from "./todo.model";
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  getAll() {
    console.log('making call to get todos');
    return this.http.get<TodoModel[]>("/api/todos");
  }

  getById(id: String) {
    console.log(`making call to get todo ${id}`);
    return this.http.get<TodoModel>(`/api/todos/${id}`);
  }
}
