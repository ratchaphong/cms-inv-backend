// src/user/user.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'สร้างผู้ใช้ใหม่ (Admin ใช้ได้)' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'สร้างผู้ใช้สำเร็จ',
    type: UserResponseDto,
  })
  async create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(body);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true, // คัดเฉพาะที่มี @Expose
    });
  }

  @Get()
  @ApiOperation({ summary: 'ดูรายการผู้ใช้ทั้งหมด (Admin ใช้ได้)' })
  @ApiOkResponse({
    description: 'รายการผู้ใช้ทั้งหมด',
    type: UserResponseDto,
    isArray: true,
  })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true, // คัดเฉพาะที่มี @Expose
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'อัปเดตข้อมูลผู้ใช้ (Admin ใช้ได้)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'อัปเดตข้อมูลผู้ใช้สำเร็จ',
    type: UserResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, dto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true, // คัดเฉพาะที่มี @Expose
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ดูข้อมูลโปรไฟล์ของตัวเอง' })
  @ApiOkResponse({ type: UserResponseDto })
  async getProfile(@CurrentUser() user: User) {
    const fullUser = await this.userService.findByEmail(user.email);

    return plainToInstance(UserResponseDto, fullUser, {
      excludeExtraneousValues: true,
    });
  }
}
