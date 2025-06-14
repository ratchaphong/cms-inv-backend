import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class QrResponseDto {
  @ApiProperty({
    type: String,
    description: 'Base64 string ของ QR Code',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...',
  })
  @Expose()
  qrBase64: string;
}
