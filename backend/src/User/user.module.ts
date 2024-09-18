import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./Entity/user.entity";
import UserService from "./user.service";
import IdCheckMiddleware from "src/middlewares/id-check.middleware";

@Module({
    providers: [UserService],
    exports: [
        UserService,
        TypeOrmModule.forFeature([UserEntity])
    ],
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export default class UserModule{}