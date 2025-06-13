// src/stock/entities/stock.entity.ts
import {
  Stock as PrismaStock,
  StockType,
  Product as PrismaProduct,
} from '@prisma/client';
import { ProductEntity } from 'src/product/entities/product.entity';

export class StockEntity implements PrismaStock {
  id: number;
  productId: number;
  type: StockType;
  quantity: number;
  note: string | null;
  createdAt: Date;

  // Relation
  product?: ProductEntity;

  constructor(data: PrismaStock & { product?: PrismaProduct }) {
    Object.assign(this, data);

    if (data.product) {
      this.product = new ProductEntity(data.product);
    }
  }
}
