import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { Like } from '@prisma/client';
import { LikeDto } from './like.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Like Controller')
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get('post/:id')
  async getLikesByPostId(@Param('id') id: number): Promise<Like[]> {
    return this.likeService.getLikesByPostId({ postId: Number(id) });
  }

  @Get('user/:id')
  async getLikesByUserId(@Param('id') id: number): Promise<Like[]> {
    return this.likeService.getLikesByUserId({ userId: Number(id) });
  }

  @Post('')
  async createOrDeleteLike(@Body() like: LikeDto) {
    return this.likeService.createOrDeleteLike({ like });
  }
}
