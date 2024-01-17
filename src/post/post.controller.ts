import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from '@prisma/client';
import { postTypeEnum } from '../enums/postType.enum';
import { PostType } from 'src/types/postType.type';

@ApiTags('Post Controller')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('')
  async listPosts(
    @Query('postId') originalPostId: number,
    @Query('userId') userId: number,
  ) {
    return await this.postService.listPosts({
      originalPostId: Number(originalPostId),
      userId: Number(userId),
    });
  }

  @Post('')
  async createPost(@Body() post: CreatePostDto): Promise<PostEntity> {
    return await this.postService.createPost({ post });
  }

  @Post('/repost/:id')
  async createRepost(
    @Body() post: CreatePostDto,
    @Param('id') originalPostId: number,
  ): Promise<PostEntity> {
    return await this.postService.createPost({
      post,
      originalPostId: Number(originalPostId),
      type: postTypeEnum.REPOST as PostType,
    });
  }

  @Post('/reply/:id')
  async createReplyPost(
    @Body() post: CreatePostDto,
    @Param('id') originalPostId: number,
  ): Promise<PostEntity> {
    return await this.postService.createPost({
      post,
      originalPostId: Number(originalPostId),
      type: postTypeEnum.REPLY as PostType,
    });
  }

  @Delete('')
  async deletePosts(@Body() { ids }: { ids: number[] }) {
    return await this.postService.deletePosts({ ids });
  }

  @Get(':id')
  async getPostByid(@Param('id') id: number): Promise<PostEntity> {
    return await this.postService.getPostById({ id: Number(id) });
  }

  @Patch(':id')
  async updatePostById(
    @Param('id') id: number,
    @Body() post: UpdatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.updatePostById({ id: Number(id), post });
  }

  @Delete(':id')
  async deletePostById(@Param('id') id: number) {
    return await this.postService.deletePostById({ id: Number(id) });
  }
}
