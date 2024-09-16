import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import {OmitType} from '@nestjs/mapped-types'
import { CreateUserDto } from "./create-user.dto";

export class LoginUserDto extends OmitType(CreateUserDto,  ['name']) {}