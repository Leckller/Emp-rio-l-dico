import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import ProductService from "./product.service";
import CreateProductDto from "./Dto/create-product.dto";
import { NumParam } from "src/decorators/num-param.decorator";
import AuthProductGuard from "src/guard/authProduct.guard";
import { FileInterceptor } from "@nestjs/platform-express";

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

    @Post('image')
    // Interceptor para ler arquivo enviado
    // UploadFile pega o arquivo p gente 
    @UseInterceptors(FileInterceptor('file'))
    async addImage(@UploadedFile() file: Express.Multer.File) {

        return await this.productService.uploadImages([file]);

    }

    @Post('images') 
    @UseGuards(AuthProductGuard)
    async addImages() {

    }

    @Post()
    @UseGuards(AuthProductGuard)
    async addProduct(@Body() {age,description,group,name,price,time}: CreateProductDto) {
        return await this.productService.create({age,description,group,name,price,time})
    }
}