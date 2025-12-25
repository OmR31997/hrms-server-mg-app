import { ExecutionContext } from "@nestjs/common";
import { UserDocument as User } from "src/modules/user/user.schema";

export class UserAccessor {
    static user(ctx: ExecutionContext, data?: keyof User) {

        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return user ? (data ? user[data] : user) : null;
    }
} 