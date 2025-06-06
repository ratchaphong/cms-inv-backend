// src/product/product.module.ts
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AuthModule } from '../auth/auth.module'; // ✅ เพิ่มเข้ามา

@Module({
  imports: [AuthModule], // ✅ เพื่อให้ JwtStrategy / AuthGuard ใช้ได้
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
