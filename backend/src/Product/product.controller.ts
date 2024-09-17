import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import ProductService from "./product.service";
import CreateProductDto from "./Dto/create-product.dto";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get(':page')
    // Converte para inteiro / number
    Products(@Param('page', ParseIntPipe) param){
        return {param}
    }

    @Post()
    async addProduct(@Body() {age,description,group,name,price,time}: CreateProductDto) {
        return await this.productService.create({age,description,group,name,price,time})
    }
}