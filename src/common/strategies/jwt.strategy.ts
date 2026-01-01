import type { ConfigType } from "@nestjs/config";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfigFactory } from "@config/jwt.config";
import { JwtRequestPayload } from "@common/types/payload.type";
import { IJwtPayload } from "@common/interfaces/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject(jwtConfigFactory.KEY)
        config: ConfigType<typeof jwtConfigFactory>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secret
        });
    }

    async validate(payload: JwtRequestPayload & { readonly iat: number }): Promise<IJwtPayload> {

        return {
            sub: payload.sub,
            ref_by: payload.ref_by,
            role_id: payload.role_id,
            company_id: payload?.company_id,
        };
    }
}