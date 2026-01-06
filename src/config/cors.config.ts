import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const origin = (
    requestOrigin:string | undefined, 
    callback: (err: Error | null, allow?: boolean) => void) => {
    const allowed = [
        process.env.PROD_CLIENT,
        process.env.DEV_CLIENT,
        `http://localhost:${process.env.PORT}`,
    ].filter(Boolean);

    if (!requestOrigin || allowed.includes(requestOrigin)) {
        callback(null, true);
    } else {
        callback(new Error("Not allowed by CORS"));
    }
}

export const corsConfig: CorsOptions = {
    origin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
    exposedHeaders: ["set-cookie"]
} 