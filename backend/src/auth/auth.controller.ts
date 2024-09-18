import { ImATeapotException, Body, Controller, Post, UseGuards } from "@nestjs/common";
import AuthLoginDto from "./Dto/auth-login.dto";
import { AuthRegisterDto } from "./Dto/auth-register.dto";
import AuthForgetDto from "./Dto/auth-forget.dto";
import UserService from "src/User/user.service";
import AuthService from "./auth.service";
import AuthGuard from "src/guard/auth.guard";
import { User } from "src/decorators/user.decorator";
import AuthPasswordDto from "./Dto/auth-password.dto";
import { CreateUserDto } from "src/User/Dto/create-user.dto";

@Controller('auth')
export default class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: AuthLoginDto){
        return await this.authService.login(body.email, body.password);
    }

    @Post('register') 
    async register(@Body() {email,name,password}: CreateUserDto){
        return await this.authService.register({email,name,password})
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDto){
        return await this.authService.forget(email);
    }

    @UseGuards(AuthGuard)
    @Post('reset')
    reset(@Body() {password}: AuthPasswordDto, @User() token){
        try {
            return this.authService.reset(password, token);
        } catch (e) {
            throw new ImATeapotException("Error:", e)
        }
    }
}