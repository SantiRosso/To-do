import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { CreateTaskDto } from 'src/dtos/task.dto';

@Injectable()
export class TasksService {
  //esto simula una base de datos
  private tasks: Task[] = [
    {
      id: '1',
      title: 'first task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
    {
      id: '2',
      title: 'second task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
    {
      id: '3',
      title: 'third task',
      description: 'some task',
      status: TaskStatus.PENDING,
    },
  ];
  async getAllTask(): Promise<Task[]> {
    return this.tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask: Task = {
      id: v4(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  updateTask() {}
  deleteTask() {}
}
