// src/product/dto/clear-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ClearResponseDto {
  @ApiProperty({ example: '✅ Cleared all products' })
  message: string;
}
