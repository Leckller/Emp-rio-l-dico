import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";


export const User = createParamDecorator((data: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();

    if(!request.token) {

        throw new BadRequestException("Ops.. parece que algum deve fez besteira")

    }

    if(data){
        
        return request.token[data];

    }

    return request.token;

});