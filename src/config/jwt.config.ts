import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";
import { StringValue } from "ms";

export const jwtConfigFactory = registerAs("jwt", () => ({
    secret: process.env.JWT_SECRET!,
    signOptions: {
        expiresIn: (process.env.JWT_EXPIRE_IN ?? "24h") as StringValue
    } satisfies JwtSignOptions
}))