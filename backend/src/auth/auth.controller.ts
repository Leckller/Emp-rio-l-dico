import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import AuthLoginDto from "./Dto/auth-login.dto";
import { AuthRegisterDto } from "./Dto/auth-register.dto";
import AuthForgetDto from "./Dto/auth-forget.dto";
import UserService from "src/User/user.service";
import AuthService from "./auth.service";
import AuthGuard from "src/guard/auth.guard";
import { User } from "src/decorators/user.decorator";
import AuthPasswordDto from "./Dto/auth-password.dto";

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
    @UseGuards(AuthGuard)
    reset(@User() token, @Body() {password}: AuthPasswordDto){
        return this.authService.reset(password, token);
    }
}