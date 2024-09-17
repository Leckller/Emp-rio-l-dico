import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const NumParam = createParamDecorator((data: string, context: ExecutionContext) => {
    return +context.switchToHttp().getRequest().params[data];
});