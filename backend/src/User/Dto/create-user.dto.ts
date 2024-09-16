import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import UserType from "../Type/User.type";

export class CreateUserDto implements UserType {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
    password: string;
}