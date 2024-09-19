import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import ProductService from "./product.service";
import CreateProductDto from "./Dto/create-product.dto";
import { NumParam } from "src/decorators/num-param.decorator";
import AuthGuard from "src/guard/auth.guard";

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('page/:page')
    async listProducts(@NumParam('page') page: number){
        return await this.productService.getProducts(page);
    }

    @Get(':id')
    async productById(@NumParam('id') id: number) {
        return await this.productService.getProductById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async addProduct(@Body() {age,description,group,name,price,time}: CreateProductDto) {
        return await this.productService.create({age,description,group,name,price,time})
    }
}