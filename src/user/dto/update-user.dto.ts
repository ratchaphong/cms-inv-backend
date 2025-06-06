import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'John Doe' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'John' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Doe' })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'john@example.com' })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '0812345678' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'male' })
  gender?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({ example: '1990-01-01' })
  birthDate?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'https://i.pravatar.cc/150?img=3' })
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: '123 Main Street, Bangkok' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'admin' })
  role?: string;
}
