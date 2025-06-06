// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module'; // ✅ เพิ่มเพื่อใช้ AuthGuard และ CurrentUser

@Module({
  imports: [AuthModule], // ✅ ต้องมีเพื่อให้ AuthGuard ใช้งานได้
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
