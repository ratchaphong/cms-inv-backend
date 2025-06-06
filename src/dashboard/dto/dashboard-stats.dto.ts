// src/dashboard/dto/dashboard-stats.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';

export class DashboardStatsDto {
  @ApiProperty({ example: 120 })
  totalProducts: number;

  @ApiProperty({ example: 15 })
  stockInToday: number;

  @ApiProperty({ example: 7 })
  stockOutToday: number;

  @ApiProperty({ example: 5 })
  totalUsers: number;

  @ApiProperty({ type: [ProductResponseDto] })
  availableProducts: ProductResponseDto[];
}
