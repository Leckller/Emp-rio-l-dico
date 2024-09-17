import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserType from "../Type/User.type";

@Entity({name: 'users'})
export default class UserEntity implements UserType {
    @PrimaryGeneratedColumn({
        unsigned: true,
    })
    id: number;

    @Column({ length: 63})
    name: string;
    
    @Column({ length: 127, unique: true})
    email: string;
    
    @Column({ length: 127, unique: true})
    password: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}