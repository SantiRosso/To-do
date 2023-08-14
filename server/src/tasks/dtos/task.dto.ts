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
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  description: string;
  authorId: number;
  status: TaskStatus;
}

export class updateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  title: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(15)
  @IsOptional()
  description: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
  status: TaskStatus;
}
