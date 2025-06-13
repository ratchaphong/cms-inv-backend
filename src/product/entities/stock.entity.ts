import {
  StockReport as PrismaStockReport,
  StockType,
  Product as PrismaProduct,
} from '@prisma/client';
import { ProductEntity } from 'src/product/entities/product.entity';

export class StockArchivedReportEntity implements PrismaStockReport {
  id: number;
  stockId: number;
  type: StockType;
  quantity: number;
  note: string | null; // ปรับให้ตรงกับ Prisma type (ไม่ optional)
  productId: number;
  createdAt: Date;
  archivedAt: Date;

  // Optional relation
  product?: ProductEntity;

  constructor(
    partial: Partial<PrismaStockReport> & { product?: PrismaProduct },
  ) {
    Object.assign(this, partial);

    if (partial.product) {
      this.product = new ProductEntity(partial.product);
    }
  }
}
