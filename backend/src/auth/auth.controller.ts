import { Body, Controller, Post } from "@nestjs/common";
import AuthLoginDto from "./Dto/auth-login.dto";
import { AuthRegisterDto } from "./Dto/auth-register.dto";
import AuthForgetDto from "./Dto/auth-forget.dto";
import AuthResetDto from "./Dto/auth-reset.dto";
import UserService from "src/User/user.service";
import AuthService from "./auth.service";

@Controller('auth')
export default class AuthController {

    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() body: AuthLoginDto){
        return this.authService.login(body.email, body.password);
    }

    @Post('register') 
    register(@Body() body: AuthRegisterDto){
        // return this.authService.
    }

    @Post('forget')
    forget(@Body() body: AuthForgetDto){
        return this.authService.forget(body.email);
    }

    @Post('reset')
    reset(@Body() body: AuthResetDto){
        return this.authService.reset(body.password, body.token);
    }
}