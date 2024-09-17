import { Repository } from "typeorm";
import UserEntity from "./Entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}
}