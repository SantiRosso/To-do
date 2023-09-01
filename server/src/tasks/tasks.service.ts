import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dtos/crateTask.dto';
import { UpdateTaskDto } from './dtos/updateTast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['author'],
    });
  }

  async getById(id: string) {
    const taskFound = await this.taskRepository.find({
      where: {
        id,
      },
    });

    if (!taskFound) {
      return new HttpException('task not found', HttpStatus.NOT_FOUND);
    }

    return taskFound;
  }

  async create(createTaskDto: CreateTaskDto) {
    const userFound = await this.userService.getUserById(
      createTaskDto.authorId,
    );

    if (!userFound.hasOwnProperty('username')) {
      return new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  async update(id: string, updateTaskFields: UpdateTaskDto) {
    const result = await this.taskRepository.update({ id }, updateTaskFields);

    if (result.affected === 0) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async delete(id: string) {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
