import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profiles.service';
import { UpdateProfileDto } from './dtos/updateProfile.dto';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.profileService.create(id, profile);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Delete(':id/:userId')
  delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.profileService.delete(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFields: UpdateProfileDto,
  ) {
    return this.profileService.update(id, updateFields);
  }
}
