import { Body, Controller, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./Dto/create-user.dto";
import { LoginUserDto } from "./Dto/login-user.dto";
import PathUserDto from "./Dto/path-user.dto";

@Controller('users')
export default class UserController {

    @Post('singUp')
    signUp(@Body() Body: CreateUserDto) {
        return Body;
    }

    @Post('singIn')
    signIn(@Body() Body: LoginUserDto) {
        return Body;
    }

    @Patch()
    editUser(@Body() Body: PathUserDto) {
        return Body;
    } 
}