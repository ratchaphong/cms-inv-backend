// src/stock/stock.cron.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockCronJob {
  private readonly logger = new Logger(StockCronJob.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleMidnightStockCleanup() {
    this.logger.log('⏰ Midnight job: Archiving and cleaning old stock...');

    const outdatedStocks = await this.prisma.stock.findMany({
      where: {
        createdAt: { lt: this.getSevenDaysAgo() },
      },
    });

    if (outdatedStocks.length === 0) {
      this.logger.log('✅ No old stock to archive.');
      return;
    }

    try {
      // ✅ เก็บข้อมูลลง StockReport
      await this.prisma.stockReport.createMany({
        data: outdatedStocks.map((s) => ({
          stockId: s.id,
          type: s.type,
          quantity: s.quantity,
          note: s.note,
          productId: s.productId,
          createdAt: s.createdAt,
          // archivedAt ใช้ default
        })),
      });

      // ✅ ลบ Stock เก่า
      const deleted = await this.prisma.stock.deleteMany({
        where: {
          id: { in: outdatedStocks.map((s) => s.id) },
        },
      });

      this.logger.log(`✅ Archived & deleted ${deleted.count} stock records.`);
    } catch (err) {
      this.logger.error('❌ Failed to archive & clean old stock', err);
    }
  }

  // ✅ รันทุกวันตอนเที่ยงวัน — แจ้งเตือนล่วงหน้า
  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleNoonStockWarning() {
    this.logger.log('🔔 Noon job: Checking old stock for tonight...');

    try {
      const count = await this.prisma.stock.count({
        where: {
          createdAt: {
            lt: this.getSevenDaysAgo(),
          },
        },
      });

      if (count > 0) {
        this.logger.warn(
          `⚠️ There are ${count} stock records older than 7 days. They will be deleted at midnight.`,
        );
      } else {
        this.logger.log('✅ No outdated stock records found.');
      }
    } catch (err) {
      this.logger.error('❌ Failed to check stock before deletion', err);
    }
  }

  //   @Cron('*/10 * * * * *') // ทุก 10 วินาที
  //   handleDebugTest() {
  //     this.logger.log('🔄 Running test every 10 seconds...');
  //   }

  //   @Cron('30 14 * * *') // เวลา 14:30 ทุกวัน
  //   handleSpecificTimeJob() {
  //     this.logger.log('🕒 Job running at 14:30 daily.');
  //   }

  private getSevenDaysAgo(): Date {
    return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  }
}
