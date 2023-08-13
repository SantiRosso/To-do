import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    await this.usersService.create(newUser);
    return 'User created successfully';
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }
}
