import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import UserType from "../Type/User.type";

@Entity()
export default class UserEntity implements UserType {
    @PrimaryColumn({
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