import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000', // Frontend URL
      credentials: true,
      // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Inventory System API')
    .setDescription('ระบบ API สำหรับ Inventory System')
    .setVersion('1.0')
    .addBearerAuth() // ✅ สำหรับใช้ JWT Auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // ➜ http://localhost:3001/api

  await app.listen(3001);
}
bootstrap();
