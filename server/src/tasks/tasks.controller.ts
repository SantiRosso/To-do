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
import { CreateTaskDto, updateTaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async findAllTask(): Promise<Task[]> {
    const tasks: Task[] = await this.taskService.getAllTask();
    return tasks;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.taskService.getById(id);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto): Promise<Task> {
    const newTask: Task = await this.taskService.createTask(task);
    return newTask;
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskFields: updateTaskDto,
  ) {
    await this.taskService.updateTask(id, updateTaskFields);
    return 'Task updated seccesfully';
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
    return 'Task deleted successfully!';
  }
}
