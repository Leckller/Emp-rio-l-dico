import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import ProductService from "./product.service";
import CreateProductDto from "./Dto/create-product.dto";
import { NumParam } from "src/decorators/num-param.decorator";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('page/:page')
    // Converte para inteiro / number
    listProducts(@NumParam('page') page){
        return {page}
    }

    @Get(':id')
    productById(@NumParam('id') id) {
        return {id}
    }

    @Post()
    async addProduct(@Body() {age,description,group,name,price,time}: CreateProductDto) {
        return await this.productService.create({age,description,group,name,price,time})
    }
}