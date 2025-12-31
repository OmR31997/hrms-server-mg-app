import { SetMetadata } from "@nestjs/common";

export const ACCESS_KEY = "access";

export interface AccessMeta {
    action: string,
    resource: string
}

export const Access = (meta: AccessMeta) => SetMetadata(ACCESS_KEY, meta);