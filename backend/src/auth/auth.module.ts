import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";
import UserModule from "src/User/user.module";

@Module({
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController],
    imports: [
        AuthModule,
        JwtModule.register({
        secret: 'abcd'
        }),
        UserModule
    ]
})
export default class AuthModule {}