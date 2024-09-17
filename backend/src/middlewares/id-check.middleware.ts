import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export default class IdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Verifica se o id ou page passado no params da rota é um número válido
        const param = req.params.id || req.params.page;
        if(isNaN(Number(param)) || Number(param) <= 0) {
            throw new BadRequestException('ID Inválido');
        }
        next()
    }
}