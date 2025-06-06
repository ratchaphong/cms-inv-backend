// src/stock/stock.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
} from '@nestjs/swagger';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { StockResponseDto } from './dto/stock-response.dto';
import { StockCronReportDto } from './dto/stock-cron-report.dto';
import { plainToInstance } from 'class-transformer';
import { StockArchivedReportDto } from './dto/stock-archived-report.dto';

@ApiTags('Stock')
@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'เพิ่มประวัติ IN/OUT Stock สำหรับสินค้า' })
  @ApiBody({ type: CreateStockDto })
  @ApiCreatedResponse({
    description: 'สร้าง Stock สำเร็จ',
    type: StockResponseDto,
  })
  async create(@Body() dto: CreateStockDto): Promise<StockResponseDto> {
    const created = await this.stockService.create(dto);
    return plainToInstance(StockResponseDto, created, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'ดูประวัติ Stock ทั้งหมด' })
  @ApiOkResponse({
    description: 'แสดงรายการ Stock ทั้งหมด',
    type: StockResponseDto,
    isArray: true,
  })
  async findAll(): Promise<StockResponseDto[]> {
    const all = await this.stockService.findAll();
    return plainToInstance(StockResponseDto, all, {
      excludeExtraneousValues: true,
    });
  }

  // ✅ เพิ่ม Endpoint: manual cleanup
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/cron/report')
  @ApiOperation({
    summary: 'เรียกฟังก์ชันลบ Stock เก่า + เก็บลงรายงาน (Manual)',
  })
  @ApiOkResponse({
    description: 'รายงานประจำสัปดาห์ถูก trigger สำเร็จ',
    type: StockCronReportDto,
  })
  async runReport(): Promise<StockCronReportDto> {
    return this.stockService.runManualCleanup();
  }

  // ✅ เพิ่ม Endpoint: manual warning
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/cron/warning')
  @ApiOperation({ summary: 'ตรวจสอบ Stock เก่าล่วงหน้า (Manual)' })
  @ApiOkResponse({
    description: 'การตรวจสอบ Stock สำเร็จ',
    type: StockCronReportDto,
  })
  async runWarning(): Promise<StockCronReportDto> {
    return this.stockService.runManualWarning();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/report/archived')
  @ApiOperation({ summary: 'รายงาน Stock ที่ถูก Archive แล้ว (จาก Cron)' })
  @ApiOkResponse({
    description: 'รายงาน Stock ที่ลบและเก็บแล้ว',
    type: StockArchivedReportDto,
    isArray: true,
  })
  async getArchivedReport(): Promise<StockArchivedReportDto[]> {
    return this.stockService.getArchivedReport();
  }
}
