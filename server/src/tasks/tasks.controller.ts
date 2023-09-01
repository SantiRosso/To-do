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
import { CreateTaskDto } from './dtos/crateTask.dto';
import { UpdateTaskDto } from './dtos/updateTast.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTask() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.taskService.getById(id);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return await this.taskService.create(task);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskFields: UpdateTaskDto,
  ) {
    return await this.taskService.update(id, updateTaskFields);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
