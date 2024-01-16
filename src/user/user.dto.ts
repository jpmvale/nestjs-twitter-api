import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
class UserDto {
  @ApiProperty({ required: true, description: 'User name' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: true, description: 'Unique Id of user' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({ required: true, description: 'User email' })
  @IsString()
  @IsOptional()
  email: string;
}

export { UserDto };
