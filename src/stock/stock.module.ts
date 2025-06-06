import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { AuthModule } from '../auth/auth.module';
import { StockCronJob } from './stock.cron';

@Module({
  imports: [AuthModule], // ✅ นำ auth มาใช้ร่วมกับ @UseGuards
  controllers: [StockController], // ✅ เชื่อม controller
  providers: [StockService, StockCronJob], // ✅ ใช้ทั้ง service และ cron job
})
export class StockModule {}
