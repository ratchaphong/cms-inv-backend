import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { ProductStatus, StockType } from '@prisma/client';
import { StockCronJob } from './stock.cron';
import { StockEntity } from './entities/stock.entity';
import { StockArchivedReportEntity } from './entities/stock-archived-report.entity';

@Injectable()
export class StockService {
  constructor(
    private prisma: PrismaService,
    private readonly cron: StockCronJob,
  ) {}

  async create(dto: CreateStockDto): Promise<StockEntity> {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) throw new NotFoundException('Product not found');

    const updatedStock =
      dto.type === StockType.IN
        ? product.currentStock + dto.quantity
        : product.currentStock - dto.quantity;

    let status: ProductStatus;
    if (updatedStock > 10) {
      status = ProductStatus.AVAILABLE;
    } else if (updatedStock <= 0) {
      status = ProductStatus.OUT_OF_STOCK;
    } else {
      status = ProductStatus.LOW_STOCK;
    }

    await this.prisma.product.update({
      where: { id: dto.productId },
      data: {
        currentStock: updatedStock,
        status,
      },
    });

    const newStock = await this.prisma.stock.create({
      data: dto,
      include: { product: true },
    });

    return new StockEntity(newStock);
  }

  async findAll(): Promise<StockEntity[]> {
    const result = await this.prisma.stock.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    return result.map((r) => new StockEntity(r));
  }

  async getArchivedReport(): Promise<StockArchivedReportEntity[]> {
    const rows = await this.prisma.stockReport.findMany({
      include: {
        product: true,
      },
      orderBy: {
        archivedAt: 'desc',
      },
    });

    return rows.map((s) => new StockArchivedReportEntity(s));
  }

  async runManualCleanup(): Promise<void> {
    await this.cron.handleMidnightStockCleanup();
  }

  async runManualWarning(): Promise<void> {
    await this.cron.handleNoonStockWarning();
  }
}
