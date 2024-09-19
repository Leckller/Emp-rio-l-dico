import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import CreateProductDto from "./Dto/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import ProductEntity from "./Entity/product.entity";
import { Repository } from "typeorm";
import { writeFile } from "fs/promises";
import { join } from "path";

@Injectable()
export default class ProductService {
    
    constructor(@InjectRepository(ProductEntity) private repository: Repository<ProductEntity>) {}

    async getProducts(page: number) {

        const products = await this.repository.find({skip: (page * 10) - 10, take: 10});

        return {products};

    }

    async getProductById(id: number) {
        
        const product = await this.repository.findOne({where: {id}}) // Returns ProductEntity or Null;
        
        if(!product) {

            throw new NotFoundException("Id não encontrado.");

        }

        return {product}

    }

    async create(product: CreateProductDto) {

        const nameExists = await this.repository.exists({where: {name: product.name}});

        if(nameExists) {

            throw new BadRequestException(`Já existe um produto com o nome ${product.name}`);
        
        }
        
        const p = this.repository.create(product);
        
        return await this.repository.save(p);

    }

    async uploadImages (images: Express.Multer.File[]) {

        try {

            const name = 'teste'
        
            images.forEach(async (image, index) => {

                await writeFile(join(__dirname, '..', '..', 'storage', 'images', `${name}-${index}.png`), image.buffer);
    
            });
            
            return {ok: true}

        } catch (e) {

            throw new BadRequestException(e);

        }
    }
}