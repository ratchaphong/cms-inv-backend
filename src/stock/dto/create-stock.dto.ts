// ✅ ใช้ enum จริงใน DTO
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StockType } from '@prisma/client';

export class CreateStockDto {
  @ApiProperty({ example: 'IN', enum: StockType })
  @IsEnum(StockType)
  type: StockType;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 'Initial stock', required: false })
  @IsOptional()
  @IsString()
  note?: string; // ✅ เพิ่ม note ที่ optional
}
