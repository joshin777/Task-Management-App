import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskId!: number;
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; 
      this.getTaskDetails(this.taskId);
    });
  }

  getTaskDetails(taskId: number): void {
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
    });
  }
}
