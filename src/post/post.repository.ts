import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: true },
    });
  }

  async createPost({ post }: { post: CreatePostDto }): Promise<Post> {
    return this.prisma.post.create({
      data: post,
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
