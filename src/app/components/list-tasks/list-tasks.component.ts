import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.css'
})
export class ListTasksComponent {
  tasks: any = [];
  carregando = true;

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
