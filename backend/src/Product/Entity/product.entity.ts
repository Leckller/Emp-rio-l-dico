import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import ProductType from "../Type/product.type";

@Entity({name: 'products'})
export default class ProductEntity implements ProductType {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column({unique: true})
    name: string;

    @Column({})
    price: number;

    @Column({})
    description: string;

    @Column({})
    age: number;

    @Column({})
    group: number;

    @Column({})
    time: number;

    @Column({})
    role: string;

}