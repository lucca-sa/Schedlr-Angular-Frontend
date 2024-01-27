import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseApiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getTodoTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks?status=todo`).pipe(
      map(tasks => tasks.sort((a, b) => a.order - b.order))
    );
  }
  
  getInProgressTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks?status=inProgress`).pipe(
      map(tasks => tasks.sort((a, b) => a.order - b.order))
    );
  }
  
  getDoneTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseApiUrl}/tasks?status=done`).pipe(
      map(tasks => tasks.sort((a, b) => a.order - b.order))
    );
  }
  
  updateTaskStatus(taskId: number, newTaskStatus: string): Observable<Task[]> {
    const body = { status: newTaskStatus };
    return this.http.patch<Task[]>(`${this.baseApiUrl}/tasks/${taskId}`, body);
  }

  updateTaskStatusAndOrder(taskId: number, newTaskStatus: string, newOrder: number): Observable<Task[]> {
    const body = { status: newTaskStatus, order: newOrder };
    return this.http.patch<Task[]>(`${this.baseApiUrl}/tasks/${taskId}`, body);
  }

  updateTaskOrder(taskId: number, newOrder: number): Observable<Task[]> {
    const body = { order: newOrder };
    return this.http.patch<Task[]>(`${this.baseApiUrl}/tasks/${taskId}`, body);
  }
  
}
