import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [UserModule, PostModule, LikeModule, FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
