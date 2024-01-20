import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../../../shared/models/task';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseApiUrl: string = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  getTodoTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks?status=todo`)
  }


  getInProgressTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks?status=inProgress`)
  }

getDone(): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.baseApiUrl}/tasks?status=done`)
}

}
