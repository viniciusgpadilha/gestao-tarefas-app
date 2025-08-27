import { Routes } from '@angular/router';
import { TaskListPageComponent } from './components/task-list-page/task-list-page.component';
import { TaskFormPageComponent } from './components/task-form-page/task-form-page.component';

export const routes: Routes = [
  { path: 'tasks', component: TaskListPageComponent },
  { path: 'tasks/new', component: TaskFormPageComponent },
];
