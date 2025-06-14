import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { QrService } from './qr.service';
import { GenerateQrDto } from './dto/generate-qr.dto';
import { QrResponseDto } from './dto/qr-response.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('QR')
@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate QR code from URL' })
  @ApiOkResponse({
    description: 'Successfully generated QR code',
    type: QrResponseDto,
  })
  async generateQr(@Body() dto: GenerateQrDto): Promise<QrResponseDto> {
    const qrBase64 = await this.qrService.generateQrCode(dto.url);
    return plainToInstance(QrResponseDto, { qrBase64 });
  }

  @Get('fixed-apk')
  @ApiOperation({ summary: 'Generate QR code for fixed APK URL' })
  @ApiOkResponse({
    description: 'Successfully generated QR code from fixed URL',
    type: QrResponseDto,
  })
  async getFixedApkQr(): Promise<QrResponseDto> {
    const fixedUrl =
      'https://drive.google.com/drive/u/0/folders/1VjN0fzJMT0BAbvVaFrhDKoq4JdE3I5OU';
    const qrBase64 = await this.qrService.generateQrCode(fixedUrl);
    return plainToInstance(QrResponseDto, { qrBase64 });
  }
}
