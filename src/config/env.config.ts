import { ConfigService } from "@nestjs/config";
const configService = new ConfigService();

export const ENV = {
    IS_PROD: configService.get<string>("NODE_ENV") === "production",
    IS_DEV: configService.get<string>("NODE_ENV") !== "production"
}