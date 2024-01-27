import {
  CdkDragDrop,
  CdkDropList,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '@schedlr-frontend/task-card';
import { Task } from '../../../../shared/models/task';
import { TasksService } from '../../../../shared/services/tasks-service.service';

@Component({
  selector: 'schedlr-frontend-task-board',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, DragDropModule, CdkDropList],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export class TaskBoardComponent implements OnInit {
  todo!: Task[];
  inProgress!: Task[];
  done!: Task[];

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService.getTodoTasks().subscribe((array) => {
      this.todo = array.map((task, index) => ({ ...task, order: index }));
    });
    this.taskService.getInProgressTasks().subscribe((array) => {
      this.inProgress = array.map((task, index) => ({ ...task, order: index }));
    });
    this.taskService.getDoneTasks().subscribe((array) => {
      this.done = array.map((task, index) => ({ ...task, order: index }));
    });
  }

  onTaskDropped(
    event: CdkDragDrop<Task[]>,
    targetStatus: 'todo' | 'inProgress' | 'done'
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.updateOrders(event.container.data);
    } else {
      if (event.previousContainer.data && event.container.data) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

        const movedTask = event.container.data[event.currentIndex];
        this.updateOrders(event.container.data);
        this.taskService
          .updateTaskStatus(movedTask.id, targetStatus)
          .subscribe();
      }
    }
  }

  private updateOrders(tasks: Task[]): void {
    tasks.forEach((task, index) => {
      const initialOrder = task.order;
      const finalOrder = index;
      task.order = finalOrder;

      if (initialOrder !== finalOrder) {
        this.taskService.updateTaskOrder(task.id, finalOrder).subscribe();
      }
    });
  }
}
