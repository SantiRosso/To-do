import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepository.find({
      relations: ['tasks', 'profile'],
    });
  }

  async getUserById(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['tasks', 'profile'],
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async create(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userFound) {
      return new HttpException('username already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: number, updateFields: UpdateUserDto) {
    const result = await this.userRepository.update({ id }, updateFields);

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async delete(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async createProfile(savedProfile: Profile, id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    userFound.profile = savedProfile;

    return await this.userRepository.save(userFound);
  }
}
