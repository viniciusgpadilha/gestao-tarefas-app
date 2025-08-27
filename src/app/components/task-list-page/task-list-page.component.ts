import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../../services/tasks.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html'
})
export class TaskListPageComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.loading = false;
    });
  }

  editTask(id: number) {
    this.router.navigate(['/tasks/edit', id]);
  }

  newTask() {
    this.router.navigate(['/tasks/new']);
  }

  deleteTask(id: number) {
    if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}
