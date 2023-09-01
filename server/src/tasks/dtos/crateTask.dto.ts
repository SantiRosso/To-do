import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task.entity';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

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
