import { Module } from '@nestjs/common';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule], // ✅ เพื่อให้ JwtStrategy / AuthGuard ใช้ได้
  providers: [QrService],
  controllers: [QrController],
})
export class QrModule {}
