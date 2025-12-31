import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsConfig:CorsOptions = {
    origin: [ process.env.PROD_CLIENT!, ],
    methods: ["GET", "POST", "PUT", "PATHC", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
} 