import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  tasks: any = [];
  carregando = true;
  displayedColumns: string[] = ['id', 'description', 'status'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao buscar as tarefas');
        this.carregando = false;
      }
    })
  }
}
