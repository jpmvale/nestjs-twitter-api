import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from './user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser({ user }: { user: UserDto }): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async getUserById({ id }: { id: number }): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { id },
    });
  }

  async updateUserById({
    id,
    user,
  }: {
    id: number;
    user: UserDto;
  }): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data: user });
  }

  async deleteUserById({ id }: { id: number }): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
