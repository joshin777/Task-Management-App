import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editedTaskId: number | null = null;
  showSuccessMessage: boolean = false;
  showDeleteSuccessMessage: boolean = false;
  showSaveSuccessMessage: boolean=false;
  constructor(private taskService: TaskService,private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  markAsCompleted(task: Task): void {
    task.completed = true;
    this.taskService.updateTask(task).subscribe(() => {

      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }, error => {
      console.error('Error updating task:', error);
      // this.errorMessage = 'Failed to mark task as completed. Please try again.';
    });
  }
  
  
  toggleEditMode(taskId: number): void {
    this.editedTaskId = taskId;
  }

  saveChanges(task: Task): void {
  
    this.taskService.updateTask(task).subscribe(() => {
      this.showSaveSuccessMessage = true;
      setTimeout(() => {
        this.showSaveSuccessMessage = false;
      }, 3000);
      this.loadTasks();
  
      this.editedTaskId = null;
    }, error => {
      console.error('Error updating task:', error);
    });
  }
  
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(
      success => {
        if (success) {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.showDeleteSuccessMessage = true;
          setTimeout(() => {
            this.showDeleteSuccessMessage = false;
          }, 3000);
        }
      },
      error => {
        
        console.error('Error deleting task:', error);
      }
    );
  }
  
  goToTaskDetail(taskId: number) {
    // debugger
    this.router.navigate(['/task', taskId]);
  }
}
