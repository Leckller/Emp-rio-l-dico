import { Module } from '@nestjs/common';
import UserModule from './User/user.module';
import ProductModule from './Product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './User/Entity/user.entity';
import ProductEntity from './Product/Entity/product.entity';
import AuthModule from './auth/auth.module';
import GuardModule from './guard/guard.module';
import ImageEntity from './Product/Entity/image.entity';

@Module({
  imports: [
    UserModule, 
    ProductModule,
    AuthModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "emporioludico",
      entities: [UserEntity, ProductEntity, ImageEntity],
      synchronize: true,
      // synchronize: process.env.ENV === "development",
    })
  ],
})
export class AppModule {}
