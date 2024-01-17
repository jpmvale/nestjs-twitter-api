import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
class FollowDto {
  @ApiProperty({
    required: true,
    description: 'Id of the one who is following',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @ApiProperty({
    required: true,
    description: 'Id of the one who is being followed',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  followingUserId: number;
}

export { FollowDto };
