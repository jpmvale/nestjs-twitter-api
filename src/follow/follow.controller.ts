import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowDto } from './follow.dto';
import { FollowService } from './follow.service';
import { Follow } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Follow Controller')
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post('')
  async createFollow(@Body() follow: FollowDto): Promise<Follow> {
    const { userId, followingUserId } = follow;
    return this.followService.createFollow({ userId, followingUserId });
  }

  @Delete('')
  async deleteFollow(@Body() follow: FollowDto): Promise<void> {
    const { userId, followingUserId } = follow;
    return this.followService.deleteFollow({ userId, followingUserId });
  }

  @Get('')
  async listFollows(): Promise<Follow[]> {
    return this.followService.listFollows();
  }

  @Get('following/:id')
  async getFollowingByUserId(@Param('id') id: number): Promise<Follow[]> {
    return this.followService.getFollowingByUserId({ userId: Number(id) });
  }

  @Get('follows/:id')
  async getFollowsByUserId(@Param('id') id: number): Promise<Follow[]> {
    return this.followService.getFollowsByUserId({ userId: Number(id) });
  }
}
