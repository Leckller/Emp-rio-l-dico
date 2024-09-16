import { Module } from "@nestjs/common";
import UserController from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./Entity/user.entity";

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    exports: [
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export default class UserModule {}