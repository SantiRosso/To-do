import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersControllers {
  constructor(private usersService: UsersService) {}
}
