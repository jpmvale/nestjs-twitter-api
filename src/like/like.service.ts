import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { Like } from '@prisma/client';
import { LikeDto } from './like.dto';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async getLikesByPostId({ postId }: { postId: number }): Promise<Like[]> {
    return this.likeRepository.getLikesByPostId({ postId });
  }

  async getLikesByUserId({ userId }: { userId: number }): Promise<Like[]> {
    return this.likeRepository.getLikesByUserId({ userId });
  }

  async createOrDeleteLike({ like }: { like: LikeDto }) {
    return this.likeRepository.createOrDeleteLike({ like });
  }
}
