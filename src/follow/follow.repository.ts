import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Follow } from '@prisma/client';

@Injectable()
export class FollowRepository {
  constructor(private prismaService: PrismaService) {}
  defaultInclude = {
    follower: true,
    following: true,
  };
  async createFollow({
    userId,
    followingUserId,
  }: {
    userId: number;
    followingUserId: number;
  }): Promise<Follow> {
    return await this.prismaService.follow.create({
      data: {
        followingId: followingUserId,
        followerId: userId,
      },
      include: this.defaultInclude,
    });
  }

  async deleteFollow({
    userId,
    followingUserId,
  }: {
    userId: number;
    followingUserId: number;
  }): Promise<void> {
    await this.prismaService.follow.deleteMany({
      where: {
        followingId: followingUserId,
        followerId: userId,
      },
    });
  }

  async listFollows(): Promise<Follow[]> {
    return await this.prismaService.follow.findMany({
      include: this.defaultInclude,
    });
  }

  async getFollowsByUserId({ userId }: { userId: number }): Promise<Follow[]> {
    return await this.prismaService.follow.findMany({
      where: {
        followingId: userId,
      },
      include: this.defaultInclude,
    });
  }

  async getFollowingByUserId({
    userId,
  }: {
    userId: number;
  }): Promise<Follow[]> {
    return await this.prismaService.follow.findMany({
      where: {
        followerId: userId,
      },
      include: this.defaultInclude,
    });
  }
}
