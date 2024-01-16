import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
class LikeDto {
  @ApiProperty({ required: true, description: 'Id from author of the post' })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @ApiProperty({ required: true, description: 'Post content' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  postId: number;
}

export { LikeDto };
