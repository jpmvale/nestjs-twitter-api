import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from '@prisma/client';

import { PostType } from '../types/postType.type';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listPosts({
    originalPostId,
    allowedUserIds,
  }: {
    originalPostId: number;
    allowedUserIds: number[];
  }): Promise<Post[]> {
    const where = {};
    if (originalPostId) {
      where['originalPostId'] = originalPostId;
    }

    where['authorId'] = {
      in: allowedUserIds,
    };
    return this.prisma.post.findMany({
      where,
      include: { author: true },
    });
  }

  async createPost({
    post,
    type,
    originalPostId,
  }: {
    post: CreatePostDto;
    type?: PostType;
    originalPostId?: number;
  }): Promise<Post> {
    if (!type)
      return this.prisma.post.create({
        data: { ...post, author: { connect: { id: post.author } } },
      });
    return this.prisma.post.create({
      data: {
        ...post,
        originalPostId,
        type,
        author: { connect: { id: post.author } },
      },
    });
  }

  async getPostById({ id }: { id: number }): Promise<Post> {
    return await this.prisma.post.findFirst({
      where: { id },
    });
  }

  async updatePostById({
    id,
    post,
  }: {
    id: number;
    post: UpdatePostDto;
  }): Promise<Post> {
    return await this.prisma.post.update({ where: { id }, data: post });
  }

  async deletePosts({ ids }: { ids: number[] }) {
    return await this.prisma.post.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
