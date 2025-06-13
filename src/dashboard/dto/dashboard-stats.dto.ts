// src/dashboard/dto/dashboard-stats.dto.ts
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from 'src/product/dto/product-response.dto';

@Exclude() // ตัดทุกฟิลด์ ยกเว้นที่มี @Expose
export class DashboardStatsDto {
  @Expose()
  @ApiProperty({ example: 120 })
  totalProducts: number;

  @Expose()
  @ApiProperty({ example: 15 })
  stockInToday: number;

  @Expose()
  @ApiProperty({ example: 7 })
  stockOutToday: number;

  @Expose()
  @ApiProperty({ example: 5 })
  totalUsers: number;

  @Expose()
  @ApiProperty({ type: [ProductResponseDto] })
  @Type(() => ProductResponseDto)
  availableProducts: ProductResponseDto[];
}
