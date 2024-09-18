import { isArray, IsNumber, IsString } from "class-validator";
import ProductType from "../Type/product.type";

export default class CreateProductDto implements Omit<ProductType, 'id'>
{
    @IsString()
    name: string;
    
    @IsNumber()
    price: number;

    @IsString()
    description: string;
    
    @IsNumber()
    age: number;

    @IsNumber()
    group: number;

    
    @IsNumber()
    time: number;
}