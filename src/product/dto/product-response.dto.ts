// src/product/dto/product-response.dto.ts
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ProductResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Mouse Logitech' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'Accessories', required: false })
  category?: string;

  @Expose()
  @ApiProperty({ example: 15, description: 'ยอด stock คงเหลือ' })
  currentStock?: number; // ✅ เปลี่ยนชื่อและ type

  @Expose()
  @ApiProperty({ example: 'Available', required: false })
  status?: string;

  @Expose()
  @ApiProperty({ example: '2025-06-03T14:00:00.000Z' })
  createdAt: string;
}
