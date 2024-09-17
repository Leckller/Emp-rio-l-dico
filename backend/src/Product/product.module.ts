import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./Entity/product.entity";
import ProductService from "./product.service";

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [
        TypeOrmModule.forFeature([ProductEntity])
    ]
})
export default class ProductModule {};