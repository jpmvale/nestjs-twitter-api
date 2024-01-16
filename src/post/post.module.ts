import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository, PrismaService],
})
export class PostModule {}
