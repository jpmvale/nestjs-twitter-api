import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
class CreatePostDto {
  @ApiProperty({ required: true, description: 'Id from author of the post' })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  author: number;

  @ApiProperty({ required: true, description: 'Post content' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text: string;
}

class UpdatePostDto {
  @ApiProperty({ required: true, description: 'Post content' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text: string;
}

export { CreatePostDto, UpdatePostDto };
