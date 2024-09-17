import { Repository } from "typeorm";
import UserEntity from "./Entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./Dto/create-user.dto";

@Injectable()
export default class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async create(newUser: CreateUserDto) {
        const user = this.userRepository.create(newUser);
        return this.userRepository.save(user);
    }
}