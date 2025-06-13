import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StockType } from '@prisma/client';

@Exclude()
export class StockArchivedReportDto {
  @Expose()
  @ApiProperty({ example: 123 })
  stockId: number;

  @Expose()
  @ApiProperty({ enum: StockType })
  type: StockType;

  @Expose()
  @ApiProperty({ example: 20 })
  quantity: number;

  @Expose()
  @ApiProperty({ example: 'Initial archive' })
  note: string;

  @Expose()
  @ApiProperty({ example: 45 })
  productId: number;

  @Expose()
  @ApiProperty({ example: 'Mouse Logitech' })
  productName: string;

  @Expose()
  @ApiProperty({ example: '2025-06-12T10:00:00.000Z' })
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2025-06-12T12:00:00.000Z' })
  @Type(() => Date)
  archivedAt: Date;
}
