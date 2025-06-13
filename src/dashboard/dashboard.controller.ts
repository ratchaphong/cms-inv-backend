// src/dashboard/dashboard.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { DashboardStatsEntity } from './entities/dashboard-stats.entity';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('stats')
  @ApiOperation({ summary: 'แสดงสถิติบนหน้า Dashboard' })
  @ApiOkResponse({ type: DashboardStatsDto })
  async getStats(): Promise<DashboardStatsDto> {
    const stats: DashboardStatsEntity = await this.dashboardService.getStats();
    return plainToInstance(DashboardStatsDto, stats, {
      excludeExtraneousValues: true,
    });
  }
}
