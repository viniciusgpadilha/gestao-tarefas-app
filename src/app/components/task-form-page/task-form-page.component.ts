import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  imports: [ReactiveFormsModule]
})
export class TaskFormPageComponent implements OnInit {
  form!: FormGroup;
  editing = false;
  taskId?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['1', Validators.required],
      category_id: ['1', Validators.required],
      user_id: ['1', Validators.required]
    });

    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.editing = true;
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (response: any) => {
          this.form.patchValue({
            title: response.task.title,
            description: response.task.description
          })
        }
      });
    }
  }
  
  onSubmit() {
    if (this.form.invalid) return;
  
    const task: Task = this.form.value;
  
    if (this.editing) {
      this.taskService.updateTask(this.taskId!, task).subscribe((response: any) => {
        this.snackBar.open(response.message, 'Fechar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(task).subscribe((response: any) => {
        this.snackBar.open(response.message, 'Fechar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.router.navigate(['/tasks']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
