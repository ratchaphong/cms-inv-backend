import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class GenerateQrDto {
  @ApiProperty({
    example: 'https://drive.google.com/your-apk-link',
    description: 'URL ที่จะใช้แปลงเป็น QR Code',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
