// src/stock/dto/stock-cron-report.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class StockCronReportDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Archived & deleted 5 stock records.' })
  message: string;
}
