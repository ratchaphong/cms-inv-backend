// src/product/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import { IsString, IsInt, Min, IsEnum } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Mouse Logitech' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Accessories', required: false })
  @IsString()
  category?: string;

  @ApiProperty({ example: 15, description: 'จำนวนที่รับเข้า stock เริ่มต้น' })
  @IsInt()
  @Min(0)
  initialStock: number; // ✅ เปลี่ยนชื่อ และจะนำไปสร้าง stock record IN ใน service

  @ApiProperty({ example: 'AVAILABLE', required: false })
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
