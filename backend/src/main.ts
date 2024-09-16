import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './User/Entity/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração para validar com DTOs
  app.useGlobalPipes(new ValidationPipe());
  
  TypeOrmModule.forRoot({
    type: 'mysql',
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserEntity],
    synchronize: process.env.ENV === "development",
  });

  await app.listen(3000);
}
bootstrap();
