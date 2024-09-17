import { IsEmail } from "class-validator";

export default class AuthForgetDto {
    @IsEmail()
    email: string;
}