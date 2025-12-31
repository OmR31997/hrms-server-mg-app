import { registerAs } from "@nestjs/config";

export const authConfigFactory = registerAs ("auth", () => ({
    authCookieExpirationTime: () => new Date(Date.now() + 1000*60*60*24) //In 24h cse
}));