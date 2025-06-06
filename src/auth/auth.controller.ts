// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'เข้าสู่ระบบด้วย Email/Password' })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Login สำเร็จและได้ token',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Login ไม่สำเร็จ',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
      },
    },
  })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const token = await this.authService.validateUser(dto);
    return { access_token: token };
  }

  @Post('register')
  @ApiOperation({ summary: 'สมัครสมาชิกใหม่ด้วย Email/Password/Name' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'สมัครสมาชิกสำเร็จ',
    type: RegisterResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ข้อมูลไม่ถูกต้องหรือ Email ซ้ำ',
    schema: {
      example: {
        statusCode: 400,
        message: 'Email already exists',
      },
    },
  })
  async register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> {
    const user = await this.authService.register(dto);
    return {
      message: '✅ Registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
