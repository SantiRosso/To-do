import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 } from 'uuid';
import { CreateTaskDto, updateTaskDto } from './dtos/task.dto';

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
  async getById(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
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
  async getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }
  async updateTask(id: string, updateTaskFields: updateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const newTask = Object.assign(task, updateTaskFields);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }
  async deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id != id);
  }
}
