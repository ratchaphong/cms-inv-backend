// src/stock/dto/stock-archived-report.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { StockType } from '@prisma/client';

export class StockArchivedReportDto {
  @ApiProperty()
  stockId: number;

  @ApiProperty({ enum: StockType })
  type: StockType;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  note: string;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  archivedAt: Date;
}
