import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./Entity/product.entity";
import ProductService from "./product.service";
import IdCheckMiddleware from "src/middlewares/id-check.middleware";

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [
        TypeOrmModule.forFeature([ProductEntity])
    ]
})
export default class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // Aplica um middleware
        consumer.apply(IdCheckMiddleware).forRoutes({
            path: 'products/:id',
            method: RequestMethod.GET,
        });
        consumer.apply(IdCheckMiddleware).forRoutes({
            path: 'products/page/:page',
            method: RequestMethod.GET,
        });    
    }
};