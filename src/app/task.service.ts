import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = '...';
  private tasks: Task[] = [
    { id: 1, title: 'Module Task', description: 'Modules can be loaded eagerly when the application starts or lazy loaded asynchronously by the router', dueDate: '2024-03-10', completed: false },
    { id: 2, title: 'Api Task', description: 'Inject the ApiService into your component or another service where you want to use it', dueDate: '2024-03-12', completed: false },
    { id: 3, title: 'Data Binding Task ', description: 'Angular data binding is a two-way process: it can both send and receive data', dueDate: '2024-03-15', completed: false }
  ];

  constructor(private http: HttpClient) { }

  addTask(task: Task): Observable<Task> {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    return of(task);
  }


  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  
  updateTask(updatedTask: Task): Observable<Task> {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      return of(updatedTask);
    } else {
      return throwError('Task not found');
    }
  }


  deleteTask(id: number): Observable<boolean> {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
  getTask(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${taskId}`);
  }
}
