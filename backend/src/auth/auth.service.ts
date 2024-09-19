import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "src/User/Entity/user.entity";
import UserService from "src/User/user.service";
import { Repository, Timestamp } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/User/Dto/create-user.dto";
import AuthForgetDto from "./Dto/auth-forget.dto";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @InjectRepository(UserEntity)  private readonly userRepository: Repository<UserEntity>
    ){}

    createToken(payload: any, id:number, expiresIn = "7 days") {

        return this.jwtService.sign(payload, {
            expiresIn,
            subject: String(id),
            issuer: 'login',
            audience: 'users'
        })

    }

    checkToken(token:string) {

        return this.jwtService.verify(token);

    }

    async login(email: string, password: string) {

        const user = await this.userRepository.findOne({where: {email}});

        if(!user) {
            
            throw new UnauthorizedException("Email e/ou senha incorretos.")
        
        }

        if(!(await bcrypt.compare(password, user.password))) {
        
            throw new UnauthorizedException("Email e/ou senha incorretos.");
        
        }

        return this.createToken(user, user.id);

    }

    async forget(email: string) {

        const user = await this.userRepository.findOne({where: {email}})

        if(!user) {throw new UnauthorizedException("Email incorreto.")}


        // TO-DO: Lançar um email com um token temporário para redefinição de senha
        // O token deve ser enviado para a rota reset e utilizar o serviço abaixo
        return {token: this.createToken({email: user.email, reset: user.id + user.email + user.name + user.updatedAt} as AuthForgetDto, user.id, "2 minutes")};

    }

    async reset(password: string, token: AuthForgetDto) {

        const {email, reset} = token;

        const user = await this.userRepository.findOne({where: {email}});
        
        if(reset !== (user.id + user.email + user.name + user.updatedAt)) {

            throw new UnauthorizedException("Você não tem permissão para fazer isso");

        }

        await this.userRepository.update(user, {password, updatedAt: 'puts'});

        return this.createToken({id: user.id, email: user.email, name: user.name}, user.id);

    }

    async register(newUser: CreateUserDto) {
        
        const {id, email, name} = await this.userService.createUser(newUser);
        
        return {token: this.createToken({id, email, name}, id)};

    }
}