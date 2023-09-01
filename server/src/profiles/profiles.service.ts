import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { Profile } from './entities/profile.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateProfileDto } from './dtos/updateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private usersService: UsersService,
  ) {}

  async create(id: number, profile: CreateProfileDto) {
    const userFound: any = await this.usersService.getUserById(id);

    if (!userFound || userFound instanceof HttpException) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userFound && userFound.profile) {
      return new HttpException('Profile already exists', HttpStatus.CONFLICT);
    }

    const newProfile = this.profileRepository.create(profile);

    newProfile.user = userFound;

    const savedProfile = await this.profileRepository.save(newProfile);

    return await this.usersService.createProfile(savedProfile, id);
  }

  async findAll() {
    return await this.profileRepository.find({
      relations: ['user'],
    });
  }

  async delete(id: number, userId: number) {
    const userFound = await this.usersService.getUserById(userId);

    if (!userFound || userFound instanceof HttpException) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.usersService.deleteProfile(userFound);

    const result = await this.profileRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async update(id: number, updateFields: UpdateProfileDto) {
    const result = await this.profileRepository.update({ id }, updateFields);

    if (result.affected === 0) {
      return new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
