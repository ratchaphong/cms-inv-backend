import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ScheduleModule.forRoot(), // ✅ เพิ่มตรงนี้
    PrismaModule,
    UserModule,
    AuthModule,
    ProductModule,
    StockModule,
    DashboardModule,
  ],
})
export class AppModule {}
