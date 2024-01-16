import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({});
  }

  async createUser({ user }: { user: CreateUserDto }) {
    return this.prisma.user.create({ data: user });
  }
}
