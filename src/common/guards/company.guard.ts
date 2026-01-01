import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";

export class CompanyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (!request) return true;

        const user = request.user;

        if(!user) {
            return true;
        }

        if(user.ref_by === "Admin") {
            return true;
        }

        const companyIdFromRequest = 
        request.params?.companyId || request.body?.company_id || request.query?.company_id;

        if(user.company_id.toString() !== companyIdFromRequest.toString()) {
            throw new ForbiddenException("You are not allowed to access another company data");
        }

        return true;
    }
}