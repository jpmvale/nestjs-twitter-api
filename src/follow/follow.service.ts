import { Injectable } from '@nestjs/common';
import { FollowRepository } from './follow.repository';
import { Follow } from '@prisma/client';

@Injectable()
export class FollowService {
  constructor(private followRepository: FollowRepository) {}

  async createFollow({
    userId,
    followingUserId,
  }: {
    userId: number;
    followingUserId: number;
  }): Promise<Follow> {
    return this.followRepository.createFollow({ userId, followingUserId });
  }

  async deleteFollow({
    userId,
    followingUserId,
  }: {
    userId: number;
    followingUserId: number;
  }): Promise<void> {
    return this.followRepository.deleteFollow({ userId, followingUserId });
  }

  async listFollows(): Promise<Follow[]> {
    return this.followRepository.listFollows();
  }

  async getFollowingByUserId({
    userId,
  }: {
    userId: number;
  }): Promise<Follow[]> {
    return this.followRepository.getFollowingByUserId({ userId });
  }

  async getFollowsByUserId({ userId }: { userId: number }): Promise<Follow[]> {
    return this.followRepository.getFollowsByUserId({ userId });
  }
}
