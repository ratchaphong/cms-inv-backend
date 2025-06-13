import { Product as PrismaProduct } from '@prisma/client';
import { ProductEntity } from 'src/product/entities/product.entity';

export class DashboardStatsEntity {
  totalProducts: number;
  stockInToday: number;
  stockOutToday: number;
  totalUsers: number;
  availableProducts: ProductEntity[];

  constructor(init: {
    totalProducts: number;
    stockInToday: number;
    stockOutToday: number;
    totalUsers: number;
    availableProducts: PrismaProduct[];
  }) {
    this.totalProducts = init.totalProducts;
    this.stockInToday = init.stockInToday;
    this.stockOutToday = init.stockOutToday;
    this.totalUsers = init.totalUsers;
    this.availableProducts = init.availableProducts.map(
      (p) => new ProductEntity(p),
    );
  }
}
