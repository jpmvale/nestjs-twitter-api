import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
class LikeDto {
  @ApiProperty({ required: true, description: 'User who is liking the post' })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @ApiProperty({ required: true, description: 'Post who is being liked' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  postId: number;
}

export { LikeDto };
