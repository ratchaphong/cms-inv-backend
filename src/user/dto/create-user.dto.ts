import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securepassword' })
  @MinLength(6)
  password: string;
}
