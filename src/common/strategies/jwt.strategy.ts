import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConfigFactory } from "../../config";

import type { ConfigType } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(
        @Inject(jwtConfigFactory.KEY)
        config: ConfigType <typeof jwtConfigFactory>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.secret
        });
    }

    async validate(payload: any & {readonly iat: number; readonly exp: number}) {
        
        return {
            id: payload.sub,
            role_id: payload.role_id
        };
    }
}