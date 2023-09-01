import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { Profile } from './entities/profile.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private usersService: UsersService,
  ) {}

  async create(id: number, profile: CreateProfileDto) {
    const userFound: any = await this.usersService.getUserById(id);

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userFound && userFound.profile) {
      return new HttpException('Profile already exists', HttpStatus.CONFLICT);
    }

    const newProfile = this.profileRepository.create(profile);

    const savedProfile = await this.profileRepository.save(newProfile);

    return await this.usersService.createProfile(savedProfile, id);
  }
}