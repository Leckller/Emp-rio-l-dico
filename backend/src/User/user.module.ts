import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import UserController from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./Entity/user.entity";
import UserService from "./user.service";
import IdCheckMiddleware from "src/middlewares/id-check.middleware";

@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [
        UserService,
        TypeOrmModule.forFeature([UserEntity])
    ],
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export default class UserModule implements NestModule{
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
}