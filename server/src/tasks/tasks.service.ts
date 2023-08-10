import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  private task: Task[] = [
    {
      id: 1,
      title: 'first task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
    {
      id: 2,
      title: 'second task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
    {
      id: 3,
      title: 'third task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
  ];
  getAllTask() {
    return this.task;
  }
  createTask() {}
  updateTask() {}
  deleteTask() {}
}
