import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { ProductStatus, StockType } from '@prisma/client';
import { StockCronJob } from './stock.cron';
import { StockArchivedReportDto } from './dto/stock-archived-report.dto';

@Injectable()
export class StockService {
  constructor(
    private prisma: PrismaService,
    private readonly cron: StockCronJob,
  ) {}

  async create(dto: CreateStockDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) throw new NotFoundException('Product not found');

    // ✅ คำนวณ stock ใหม่
    const updatedStock =
      dto.type === StockType.IN
        ? product.currentStock + dto.quantity
        : product.currentStock - dto.quantity;

    // ✅ คำนวณ status ตามเงื่อนไขใหม่
    let status: ProductStatus;
    if (updatedStock > 10) {
      status = ProductStatus.AVAILABLE;
    } else if (updatedStock <= 0) {
      status = ProductStatus.OUT_OF_STOCK;
    } else {
      status = ProductStatus.LOW_STOCK;
    }

    // ✅ อัปเดต currentStock และ status
    await this.prisma.product.update({
      where: { id: dto.productId },
      data: {
        currentStock: updatedStock,
        status,
      },
    });

    // ✅ สร้าง stock record
    const newStock = await this.prisma.stock.create({
      data: dto,
      include: { product: true },
    });

    console.log('✅ Created Stock:', newStock);

    return newStock;
  }

  async findAll() {
    const result = await this.prisma.stock.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    console.log('📦 Fetched Stock:', result);
    return result;
  }

  async runManualCleanup(): Promise<{ success: boolean; message: string }> {
    await this.cron.handleMidnightStockCleanup();
    return {
      success: true,
      message: 'Archived & cleaned old stock successfully.',
    };
  }

  async runManualWarning(): Promise<{ success: boolean; message: string }> {
    await this.cron.handleNoonStockWarning();
    return {
      success: true,
      message: 'Checked old stock successfully.',
    };
  }

  async getArchivedReport(): Promise<StockArchivedReportDto[]> {
    const data = await this.prisma.stockReport.findMany({
      include: {
        product: true,
      },
      orderBy: {
        archivedAt: 'desc',
      },
    });

    return data.map((s) => ({
      stockId: s.stockId,
      type: s.type,
      quantity: s.quantity,
      note: s.note,
      productId: s.productId,
      productName: s.product.name,
      createdAt: s.createdAt,
      archivedAt: s.archivedAt,
    }));
  }
}
