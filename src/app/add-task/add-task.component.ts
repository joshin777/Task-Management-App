
import { Component } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  task: Task = { id: 0, title: '', description: '', dueDate: '', completed: false };
  showAddSuccessMessage: boolean = false;

  constructor(private taskService: TaskService,private router: Router) { }

  addTask(): void {
    if (this.task.title.trim()) {
      debugger
      this.taskService.addTask(this.task).subscribe(() => {
        this.showAddSuccessMessage = true;
        setTimeout(() => {
          this.showAddSuccessMessage = false;
        }, 3000);
        
        this.task = { id: 0, title: '', description: '', dueDate: '', completed: false }; 
        this.router.navigate(['/tasks']);
      });
    }
}
}