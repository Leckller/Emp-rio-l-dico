import { Injectable } from "@nestjs/common";
import CreateProductDto from "./Dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import ProductEntity from "./Entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ProductService {
    
    constructor(@InjectRepository(ProductEntity) private productService: Repository<ProductEntity>) {}

    create(product: CreateProductDto) {
        
    }
}