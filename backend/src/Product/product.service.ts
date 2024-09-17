import { BadRequestException, Injectable } from "@nestjs/common";
import CreateProductDto from "./Dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import ProductEntity from "./Entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export default class ProductService {
    
    constructor(@InjectRepository(ProductEntity) private productService: Repository<ProductEntity>) {}

    async create(product: CreateProductDto) {
        const nameExists = await this.productService.exists({where: {name: product.name}});
        if(nameExists) {
            throw new BadRequestException(`Já existe um produto com o nome ${product.name}`);
        }
        
        const p = this.productService.create(product);
        
        return await this.productService.save(p);
    }
}