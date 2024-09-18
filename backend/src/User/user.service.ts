import { Repository } from "typeorm";
import UserEntity from "./Entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./Dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async emailExists(email: string) {
        
        const findUser = await this.userRepository.findOne({where: {email}});
        
        if(findUser) {

            return true;

        } else {

            return false;

        }
    }

    async createUser(newUser: CreateUserDto) {

        if(!(await this.emailExists(newUser.email))) {

            throw new BadRequestException('Este email já existe');
            
        }
        
        const user = this.userRepository.create(newUser);

        const salts = await bcrypt.genSalt();

        user.password = await bcrypt.hash(newUser.password, salts);

        return this.userRepository.save(user);
        
    }
}