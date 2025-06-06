import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Mouse Logitech' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Accessories' })
  category?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  @ApiPropertyOptional({ example: 'Available' })
  status?: ProductStatus;
}
