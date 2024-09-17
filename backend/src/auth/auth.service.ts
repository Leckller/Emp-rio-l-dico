import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "src/User/Entity/user.entity";
import UserService from "src/User/user.service";
import { Repository } from "typeorm";

@Injectable()
export default class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @InjectRepository(UserEntity)  private readonly userRepository: Repository<UserEntity>
    ){}

    async createToken({id,email,name}: UserEntity) {
        return this.jwtService.sign({
            id, email, name
        }, {
            expiresIn: "7 days",
            subject: String(id),
            issuer: 'login',
            audience: 'users'
        })
    }

    async checkToken(token:string) {
        return await this.jwtService.verify(token);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email, password}})
        if(!user) {throw new UnauthorizedException("Email e/ou senha incorretos.")}
        return this.createToken(user);
    }

    async forget(email: string) {
        const user = this.userRepository.findOne({where: {email}})
        if(!user) {throw new UnauthorizedException("Email incorreto.")}
        return true;
    }

    async reset(password: string, token: string) {
        // TO DO: validart o token...
        const email = token;
        const user = await this.userRepository.findOne({where: {email}})
         
        return await this.userRepository.update(user, {password});
    }

    async register() {
        return this.userRepository.
    }
}