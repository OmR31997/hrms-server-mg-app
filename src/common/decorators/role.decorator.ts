import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";

export class BaseDecorator {
    static setMetadata(key: string, value: any) {
        return SetMetadata(key, value);
    }
}

export class Roles extends BaseDecorator {
    static setRoles(...roles: string[]) {
        return this.setMetadata(ROLES_KEY, roles);
    }
}