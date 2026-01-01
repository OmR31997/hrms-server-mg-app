import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { PUBLIC_KEY } from "@common/decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }

    // canActivate(context: ExecutionContext) {
    //     const req = context.switchToHttp().getRequest();
    //     console.log('AUTH HEADER:', req.headers.authorization);

    //     return super.canActivate(context);
    // }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler()]);

        if (isPublic) return true;  //Case for public route

        const activate = await super.canActivate(context);
        if (!activate) return false;

        return true;

    }
}