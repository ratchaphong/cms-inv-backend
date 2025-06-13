// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductStatus } from '@prisma/client';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<ProductEntity> {
    const { initialStock, ...rest } = data;

    // ✅ คำนวณสถานะตามจำนวน stock
    let status: ProductStatus;
    if (initialStock > 10) {
      status = ProductStatus.AVAILABLE;
    } else if (initialStock <= 0) {
      status = ProductStatus.OUT_OF_STOCK;
    } else {
      status = ProductStatus.LOW_STOCK;
    }

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        currentStock: initialStock,
        status, // ✅ ใส่ status ที่ประมวลผลแล้ว
      },
      include: { stock: true },
    });

    return new ProductEntity(product);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({
      include: { stock: true },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((p) => new ProductEntity(p));
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: { stock: true },
    });
    return new ProductEntity(product);
  }

  async updateProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<ProductEntity> {
    const updated = await this.prisma.product.update({
      where: { id },
      data,
      include: { stock: true },
    });
    return new ProductEntity(updated);
  }

  async deleteProduct(id: number): Promise<ProductEntity> {
    await this.prisma.stock.deleteMany({ where: { productId: id } });
    const deleted = await this.prisma.product.delete({ where: { id } });
    return new ProductEntity(deleted);
  }

  // async deleteProduct(id: number): Promise<Product> {
  //   const deletedProduct = await this.prisma.product.delete({
  //     where: { id },
  //   });

  //   setTimeout(async () => {
  //     try {
  //       await this.prisma.stock.deleteMany({
  //         where: { productId: id },
  //       });
  //       console.log(`🧹 Stock for product ${id} deleted after delay`);
  //     } catch (err) {
  //       console.error('❌ Failed to delete stock after delay:', err);
  //     }
  //   }, 30_000); // 30,000 ms = 30 วินาที

  //   return deletedProduct;
  // }

  async clearAll(): Promise<number> {
    const result = await this.prisma.product.deleteMany();
    return result.count;
  }
}
