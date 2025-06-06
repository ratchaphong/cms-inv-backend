// src/auth/dto/register-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

class RegisterUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class RegisterResponseDto {
  @ApiProperty({ example: '✅ Registered successfully' })
  message: string;

  @ApiProperty({ type: RegisterUserDto })
  user: RegisterUserDto;
}
