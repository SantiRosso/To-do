import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  //   Delete,
  //   Patch,
} from '@nestjs/common';
import { CreateProfileDto } from './dtos/createProfile.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profiles.service';

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
}
