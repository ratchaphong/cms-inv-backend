// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductStatus } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
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

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        stock: true, // ✅ ดึง stock ที่สัมพันธ์มาด้วย
      },
      orderBy: { createdAt: 'desc' },
    });

    return products.map((product) => {
      const stockBalance = product.stock.reduce((acc, s) => {
        return s.type === 'IN' ? acc + s.quantity : acc - s.quantity;
      }, 0);

      return {
        ...product,
        stockBalance, // ✅ เพิ่มฟิลด์นี้เข้าไป
      };
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: { stock: true }, // ✅ ดึง stock ทั้งหมดของสินค้านี้
    });

    return product;
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await this.prisma.product.update({
      where: { id },
      data,
      include: { stock: true },
    });

    return product;
  }

  async deleteProduct(id: number): Promise<Product> {
    await this.prisma.stock.deleteMany({
      where: { productId: id },
    });

    return this.prisma.product.delete({
      where: { id },
    });
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

  async clearAll() {
    return this.prisma.product.deleteMany();
  }
}
