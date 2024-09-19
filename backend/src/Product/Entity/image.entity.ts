import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ImageEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()    
    productId: number;

}