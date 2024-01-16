import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { User } from '@prisma/client';
@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async listUsers(): Promise<User[]> {
    return this.userService.listUsers();
  }

  @Post()
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.createUser({ user });
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById({
      id: Number(id),
    });
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: number,
    @Body() user: UserDto,
  ): Promise<User> {
    return this.userService.updateUserById({ id: Number(id), user });
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<User> {
    return this.userService.deleteUserById({ id: Number(id) });
  }
}
