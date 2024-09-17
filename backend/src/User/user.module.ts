import { Module } from "@nestjs/common";
import UserController from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./Entity/user.entity";
import UserService from "./user.service";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export default class UserModule {}