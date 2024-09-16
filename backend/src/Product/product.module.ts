import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./Entity/product.entity";

@Module({
    controllers: [ProductController],
    imports: [
        TypeOrmModule.forFeature([ProductEntity])
    ],
    exports: [
        TypeOrmModule.forFeature([ProductEntity])
    ]
})
export default class ProductModule {};