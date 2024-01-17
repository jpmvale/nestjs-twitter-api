import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaService } from '../prisma.service';
import { FollowRepository } from '../follow/follow.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, FollowRepository, PrismaService],
})
export class PostModule {}
