import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskCardComponent } from '@schedlr-frontend/task-card';

@Component({
  selector: 'schedlr-frontend-task-board',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.css',
})
export class TaskBoardComponent {
  
}
