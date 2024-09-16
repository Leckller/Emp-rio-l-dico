import { Repository } from "typeorm";
import UserEntity from "./Entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

export default class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    
}