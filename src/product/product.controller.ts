// ✅ src/product/product.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';
import { ClearResponseDto } from './dto/clear-response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // ✅ ต้อง login เท่านั้น
  @ApiBearerAuth() // ✅ เพิ่มเพื่อให้ Swagger แสดงช่องใส่ token
  @ApiOperation({ summary: 'สร้างสินค้าใหม่' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({
    description: 'สร้างสินค้าสำเร็จ',
    type: ProductResponseDto,
  })
  async create(@Body() body: CreateProductDto): Promise<ProductResponseDto> {
    const product: ProductEntity = await this.productService.create(body);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true, // คัดเฉพาะที่มี @Expose
    });
  }

  @Get()
  @ApiOperation({ summary: 'ดูรายการสินค้าทั้งหมด' })
  @ApiOkResponse({
    description: 'รายการสินค้าทั้งหมด',
    type: ProductResponseDto,
    isArray: true,
  })
  async findAll(): Promise<ProductResponseDto[]> {
    const products: ProductEntity[] = await this.productService.findAll();
    return plainToInstance(ProductResponseDto, products, {
      excludeExtraneousValues: true, // คัดเฉพาะที่มี @Expose
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดูข้อมูลสินค้าโดย ID' })
  @ApiOkResponse({
    description: 'แสดงข้อมูลสินค้าที่ตรงกับ ID',
    type: ProductResponseDto,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    const product: ProductEntity = await this.productService.findOne(id);
    return plainToInstance(ProductResponseDto, product, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // ✅ ต้อง login เท่านั้น
  @ApiBearerAuth() // ✅ เพิ่มเพื่อให้ Swagger แสดงช่องใส่ token
  @ApiOperation({ summary: 'อัปเดตชื่อหรือสถานะ (เฉพาะผู้เข้าสู่ระบบ)' })
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({
    description: 'อัปเดตสินค้าสำเร็จ',
    type: ProductResponseDto,
  })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const updated: ProductEntity = await this.productService.updateProduct(
      id,
      body,
    );
    return plainToInstance(ProductResponseDto, updated, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // ✅ ต้อง login เท่านั้น
  @ApiBearerAuth() // ✅ เพิ่มเพื่อให้ Swagger แสดงช่องใส่ token
  @ApiOperation({ summary: 'ลบสินค้าโดย ID' })
  @ApiOkResponse({
    description: 'ลบสินค้าสำเร็จ',
    type: ProductResponseDto,
  })
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDto> {
    const deleted: ProductEntity = await this.productService.deleteProduct(id);
    return plainToInstance(ProductResponseDto, deleted, {
      excludeExtraneousValues: true,
    });
  }

  @Delete('clear')
  @UseGuards(JwtAuthGuard) // ✅ ต้อง login เท่านั้น
  @ApiBearerAuth() // ✅ เพิ่มเพื่อให้ Swagger แสดงช่องใส่ token
  @ApiOperation({ summary: '⚠️ ลบสินค้าทั้งหมด (เฉพาะสำหรับ admin/dev)' })
  @ApiOkResponse({
    description: 'ลบสินค้าทั้งหมดสำเร็จ',
    type: ClearResponseDto,
  })
  async clearAllProducts(): Promise<ClearResponseDto> {
    await this.productService.clearAll();
    const plain = { message: '✅ Cleared all products' };
    return plainToInstance(ClearResponseDto, plain, {
      excludeExtraneousValues: true,
    });
  }
}
