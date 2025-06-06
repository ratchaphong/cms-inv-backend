// src/stock/dto/stock-response.dto.ts
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';
import { StockType } from '@prisma/client';

@Exclude()
export class StockResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'IN' })
  type: StockType;

  @Expose()
  @ApiProperty({ example: 10 })
  quantity: number;

  @Expose()
  @ApiProperty({ example: '2025-06-04T14:00:00.000Z' })
  createdAt: string;

  @Expose()
  @ApiProperty({ example: 'Initial stock' })
  note: string;

  @Expose()
  @Type(() => ProductResponseDto)
  @ApiProperty({ type: ProductResponseDto })
  product: ProductResponseDto;
}
