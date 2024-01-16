import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './user.dto';

import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async listUsers(): Promise<User[]> {
    return await this.userRepository.listUsers();
  }

  async getUserById({ id }: { id: number }): Promise<User> {
    return await this.userRepository.getUserById({ id });
  }

  async createUser({ user }: { user: UserDto }): Promise<User> {
    return await this.userRepository.createUser({ user });
  }

  async updateUserById({
    id,
    user,
  }: {
    id: number;
    user: UserDto;
  }): Promise<User> {
    return await this.userRepository.updateUserById({ id, user });
  }

  async deleteUserById({ id }: { id: number }): Promise<User> {
    return await this.userRepository.deleteUserById({ id });
  }
}
