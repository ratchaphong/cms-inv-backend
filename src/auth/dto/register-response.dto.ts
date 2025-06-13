// src/auth/dto/register-response.dto.ts
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
class RegisterUserDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: 'John Doe' })
  name: string;
}

@Exclude()
export class RegisterResponseDto {
  @Expose()
  @ApiProperty({ example: '✅ Registered successfully' })
  message: string;

  @Expose()
  @Type(() => RegisterUserDto)
  @ApiProperty({ type: RegisterUserDto })
  user: RegisterUserDto;
}
