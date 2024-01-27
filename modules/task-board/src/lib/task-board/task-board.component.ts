import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '@schedlr-frontend/task-card';
import { Observable } from 'rxjs';
import { Task } from '../../../../shared/models/task';
import { TasksService } from '../../../../shared/services/tasks-service.service';

@Component({
  selector: 'schedlr-frontend-task-board',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export class TaskBoardComponent implements OnInit {
  todo$!: Observable<Task[]>;
  inProgress$!: Observable<Task[]>;
  done$!: Observable<Task[]>;

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.todo$ = this.taskService.getTodoTasks();

    this.inProgress$ = this.taskService.getInProgressTasks();

    this.done$ = this.taskService.getDone();
  }
}
