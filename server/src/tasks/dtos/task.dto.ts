import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  @ApiProperty()
  description: string;
  @ApiProperty()
  authorId: number;
  @ApiProperty()
  status: TaskStatus;
}

export class updateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  @ApiProperty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  @IsOptional()
  @ApiProperty()
  description: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  @ApiProperty()
  status: TaskStatus;
}
