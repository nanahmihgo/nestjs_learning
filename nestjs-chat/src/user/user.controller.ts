import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

  // localhost:3000/users
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // localhost:3000/users/{id}
  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.getUser({ userId: parseInt(userId) });
    return user;
  }
}
