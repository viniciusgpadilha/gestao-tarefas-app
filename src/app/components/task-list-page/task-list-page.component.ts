import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService, Task } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.css']
})
export class TaskListPageComponent implements OnInit {
  loading = true;

  // separando as tarefas em colunas do Kanban
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      // Exemplo: separa por status (ajuste conforme seu backend)
      this.todo = data.filter(t => t.status === 1);
      this.doing = data.filter(t => t.status === 2);
      this.done = data.filter(t => t.status === 3);
      this.loading = false;
    });
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      // atualiza o status da tarefa
      task.status = newStatus;

      // transfere para outra lista visualmente
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // salva no backend (ajuste conforme seu service)
      this.taskService.updateTask(task.id, task).subscribe();
    }
  }

  editTask(id: number) {
    this.router.navigate(['/tasks/edit', id]);
  }

  newTask() {
    this.router.navigate(['/tasks/new']);
  }

  deleteTask(id: number) {
    if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
      this.taskService.deleteTask(id).subscribe((response: any) => {
        this.snackBar.open(response.message, 'Fechar', {
          duration: 3000,
          verticalPosition: 'top'
        })

      this.loadTasks()});
    }
  }
}
