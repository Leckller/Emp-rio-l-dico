import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, retry, tap } from "rxjs";

export default class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        const dt = Date.now();

        // next.handle() -> chama a rota que queremos executar

        // ao terminar, ele chama o pipe() -> que armazena o retorno da rota

        // e vai executar a função que queremos, tap(função)

        return next.handle().pipe(tap(() => {
            // pega a requisição http que chegou
            const request = context.switchToHttp().getRequest();

            console.log(`Execução levou: ${Date.now() - dt} ms - Rota ${request.url}`);
        }))

        // por fim pega o valor que o pipe armazenou e retorna como resposta
    }
}