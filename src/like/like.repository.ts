import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Like } from '@prisma/client';
import { LikeDto } from './like.dto';

@Injectable()
export class LikeRepository {
  constructor(private prismaService: PrismaService) {}
  defaultInclude = {
    post: true,
    user: true,
  };
  async getLikesByPostId({ postId }: { postId: number }): Promise<Like[]> {
    return await this.prismaService.like.findMany({
      where: {
        postId,
      },
      include: this.defaultInclude,
    });
  }

  async getLikesByUserId({ userId }: { userId: number }): Promise<Like[]> {
    return await this.prismaService.like.findMany({
      where: {
        userId,
      },
      include: this.defaultInclude,
    });
  }

  async createOrDeleteLike({ like }: { like: LikeDto }) {
    const hasLike = await this.prismaService.like.findFirst({
      where: like,
    });
    if (hasLike) {
      await this.prismaService.like.deleteMany({
        where: like,
      });
      return {
        message: `UserId: ${like.userId} disliked postId: ${like.postId}`,
      };
    } else {
      const createdLike = await this.prismaService.like.create({ data: like });
      return {
        message: `UserId: ${like.userId} liked postId: ${like.postId}`,
        createdLike,
      };
    }
  }
}
