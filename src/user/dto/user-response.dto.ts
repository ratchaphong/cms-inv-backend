// src/user/dto/user-response.dto.ts
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude() // ตัดฟิลด์ทุกตัว ยกเว้นที่ @Expose ไว้
export class UserResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Expose()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @Expose()
  @ApiProperty({ example: '092XXXXXXX' })
  phoneNumber: string;

  @Expose()
  @ApiProperty({ example: 'Downtown' })
  address: string;

  @Expose()
  @ApiProperty({ example: 'user' })
  role: string;

  @Expose()
  @ApiProperty({ example: '2025-06-03T14:34:44.821Z' })
  createdAt: string;
}
