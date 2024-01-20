import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'task-board', pathMatch: 'full' },
  {
    path: 'task-board',
    loadComponent: () =>
      import('@schedlr-frontend/task-board').then((c) => c.TaskBoardComponent),
  },
];
