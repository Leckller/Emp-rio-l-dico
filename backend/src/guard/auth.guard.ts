import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import AuthService from "src/auth/auth.service";

@Injectable()
export default class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            
            const request = context.switchToHttp().getRequest();
                    
            const {authorization} = request.headers;
            
            const data = this.authService.checkToken((authorization ?? '').split(" ")[1]);
            
            request.token = data;

            return true;

        } catch {

            return false;

        }
        
    }
}