import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './User/Entity/user.entity';
import ProductEntity from './Product/Entity/product.entity';
import LogInterceptor from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração para validar com DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Intercepta toda rota para usar o LogInterceptor
  app.useGlobalInterceptors(new LogInterceptor());

  await app.listen(3000);
}
bootstrap();
