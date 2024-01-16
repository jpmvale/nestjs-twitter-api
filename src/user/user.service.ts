import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async createUser({ user }: { user: CreateUserDto }) {
    return await this.userRepository.createUser({ user });
  }
}
