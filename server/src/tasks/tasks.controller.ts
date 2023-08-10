import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, updateTaskDto } from 'src/dtos/task.dto';
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
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskFields: updateTaskDto) {
    return this.taskService.updateTask(id, updateTaskFields);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
    return 'Task deleted successfully!';
  }
}
