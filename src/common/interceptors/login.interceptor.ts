import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface IToken {
    msg?: string;
    access_token: string
    refresh_token?: string
    timestamp?:string;
}

@Injectable()
export class LoginInterceptor implements NestInterceptor<IToken> {
    intercept(context: ExecutionContext, next: CallHandler<IToken>): Observable<IToken> {
        return next
            .handle()
            .pipe(
                map((response: IToken) => {
                    const { access_token, refresh_token } = response ?? {};

                    return {
                        success: true,
                        message: "Access granted. Login successful",
                        access_token,
                        refresh_token,
                        timestamp: new Date().toISOString()
                    }
                })
            )
    }
}