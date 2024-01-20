import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../../../models/task';

@Component({
  selector: 'schedlr-frontend-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task
}
