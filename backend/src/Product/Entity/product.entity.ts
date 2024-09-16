import { Column, PrimaryColumn } from "typeorm";
import ProductType from "../Type/product.type";

export default class ProductEntity implements ProductType {
    @PrimaryColumn({unsigned: true})
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    age: number;

    @Column()
    group: number;

    @Column()
    time: number;
}