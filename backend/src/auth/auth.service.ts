import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "src/User/Entity/user.entity";
import UserService from "src/User/user.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import AuthPasswordDto from "./Dto/auth-password.dto";
import { AuthTokenUserDto } from "./Dto/auth-token-user.dto";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @InjectRepository(UserEntity)  private readonly userRepository: Repository<UserEntity>
    ){}

    createToken({id,email,name}: UserEntity) {

        return this.jwtService.sign(new AuthTokenUserDto(name, id, email), {
            expiresIn: "7 days",
            subject: String(id),
            issuer: 'login',
            audience: 'users'
        })

    }

    checkToken(token:string) {

        return this.jwtService.verify(token);

    }

    isValidToken (token: string) {
        try {

            this.checkToken(token);

            return true;

        } catch{

            return false;

        }
    }

    async login(email: string, password: string) {

        const user = await this.userRepository.findOne({where: {email}});

        if(!user) {
            
            throw new UnauthorizedException("Email e/ou senha incorretos.")
        
        }

        if(!(await bcrypt.compare(password, user.password))) {
        
            throw new UnauthorizedException("Email e/ou senha incorretos.");
        
        }

        return this.createToken(user);

    }

    async forget(email: string) {

        const user = this.userRepository.findOne({where: {email}})

        if(!user) {throw new UnauthorizedException("Email incorreto.")}


        // TO-DO: Lançar um email com um token temporário para redefinição de senha
        // O token deve ser enviado para a rota reset e utilizar o serviço abaixo
        return true;

    }

    // TO DO: validar o token...
    async reset(password: string, {email,id,name}: AuthTokenUserDto) {

        const user = await this.userRepository.findOne({where: {id, email, name}});
         
        await this.userRepository.update(user, {password});

        return this.createToken(user);
    }

    async register() {
        return this.userService
    }
}