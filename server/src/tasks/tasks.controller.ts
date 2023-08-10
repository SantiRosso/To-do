import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dtos/task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async findAllTask(): Promise<Task[]> {
    const tasks: Task[] = await this.taskService.getAllTask();
    return tasks;
  }
  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<Task> {
    const newTask: Task = await this.taskService.createTask(task);
    return newTask;
  }
}
