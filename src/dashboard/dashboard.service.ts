import { Injectable } from '@nestjs/common';
import { StockType, ProductStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardStatsEntity } from './entities/dashboard-stats.entity';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<DashboardStatsEntity> {
    const [availableProducts, stockInToday, stockOutToday, totalUsers] =
      await Promise.all([
        this.prisma.product.findMany({
          where: { status: ProductStatus.AVAILABLE },
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.stock.count({
          where: {
            type: StockType.IN,
            createdAt: {
              gte: this.getTodayStart(),
            },
          },
        }),
        this.prisma.stock.count({
          where: {
            type: StockType.OUT,
            createdAt: {
              gte: this.getTodayStart(),
            },
          },
        }),
        this.prisma.user.count(),
      ]);

    return {
      totalProducts: availableProducts.length,
      stockInToday,
      stockOutToday,
      totalUsers,
      availableProducts: availableProducts,
    };
  }

  private getTodayStart(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 00:00
  }
}
