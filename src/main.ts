import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    // origin: configService.get<string>('CORS_ORIGIN'),
    origin: [configService.get<string>('CORS_ORIGIN'), 'http://localhost:3003'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Inventory System API')
    .setDescription('ระบบ API สำหรับ Inventory System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
}
bootstrap();
