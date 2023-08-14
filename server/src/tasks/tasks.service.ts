import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dtos/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}
  //esto simula una base de datos
  // private tasks: Task[] = [
  //   {
  //     id: '1',
  //     title: 'first task',
  //     description: 'some task',
  //     status: TaskStatus.PENDING,
  //     authorId: 1,
  //   },
  //   {
  //     id: '2',
  //     title: 'second task',
  //     description: 'some task',
  //     status: TaskStatus.PENDING,
  //     authorId: 2,
  //   },
  //   {
  //     id: '3',
  //     title: 'third task',
  //     description: 'some task',
  //     status: TaskStatus.PENDING,
  //     authorId: 3,
  //   },
  // ];
  async getTask(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['author'],
    });
  }

  // async getById(id: string) {
  //   const taskFound = await this.taskRepository.find({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!taskFound) {
  //     return new HttpException('task not found', HttpStatus.NOT_FOUND);
  //   }

  //   return taskFound;
  // }

  async createTask(createTaskDto: CreateTaskDto) {
    const userFound = await this.userService.getUserById(
      createTaskDto.authorId,
    );

    if (!userFound) {
      return new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    const newTask = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(newTask);
  }

  // async getTaskById(id: string) {
  //   return this.taskRepository.find((task) => task.id === id);
  // }

  // async updateTask(id: string, updateTaskFields: updateTaskDto): Promise<Task> {
  //   const task = await this.getTaskById(id);
  //   const newTask = Object.assign(task, updateTaskFields);
  //   this.tasks = this.taskRepository.map((task) =>
  //     task.id === id ? newTask : task,
  //   );
  //   return newTask;
  // }

  // async deleteTask(id: string) {
  //   this.tasks = this.taskRepository.filter((task) => task.id != id);
  // }
}
