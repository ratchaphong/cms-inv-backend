// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config'; // ✅ import เพิ่ม

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule, // ✅ เพิ่มเข้าไปใน imports
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService], // 👈 แนะนำให้ export ด้วย เผื่อ UserModule ใช้งาน
})
export class AuthModule {}
