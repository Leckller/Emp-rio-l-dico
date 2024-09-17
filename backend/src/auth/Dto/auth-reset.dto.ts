import { IsJWT, IsStrongPassword } from "class-validator";

export default class AuthResetDto {

    @IsStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1
    })
    password: string;

    @IsJWT()
    token: string;
}