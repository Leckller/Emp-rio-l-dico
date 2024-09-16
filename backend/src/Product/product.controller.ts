import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

@Controller('products')
export class ProductController {
    @Get(':page')
    // Converte para inteiro / number
    Products(@Param('page', ParseIntPipe) param){
        return {param}
    }
}