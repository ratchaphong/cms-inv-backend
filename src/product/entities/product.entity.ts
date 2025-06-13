// src/product/entities/product.entity.ts
import { Product, ProductStatus, Stock, StockType } from '@prisma/client';
import { StockEntity } from 'src/stock/entities/stock.entity';

export class ProductEntity implements Product {
  name: string;
  id: number;
  category: string | null;
  currentStock: number;
  createdAt: Date;
  status: ProductStatus;

  // ความสัมพันธ์
  stock?: StockEntity[];

  // ฟิลด์คำนวณเอง
  // stockBalance?: number;

  constructor(product: Product & { stock?: Stock[] }) {
    // assign ฟิลด์จาก PrismaProduct
    Object.assign(this, product);

    if (product.stock) {
      this.stock = product.stock.map((s) => new StockEntity(s));
      // this.stockBalance = this.stock.reduce(
      //   (acc, s) =>
      //     s.type === StockType.IN ? acc + s.quantity : acc - s.quantity,
      //   0,
      // );
    }
  }
}
