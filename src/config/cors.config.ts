import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

const origin = (
    requestOrigin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
) => {
    const allowed = [
        process.env.LOCAL_URL,
        process.env.DEV_URL,
        process.env.PROD_URL,
        process.env.DEV_CLIENT,
        process.env.PROD_CLIENT
    ].filter(Boolean);

    // Check if requestOrigin starts with any allowed URL
    if (!requestOrigin || allowed.some(url => requestOrigin.startsWith(url!))) {
        callback(null, true);
    } else {
        console.warn("Blocked CORS request from:", requestOrigin);
        callback(new Error("Not allowed by CORS"));
    }
};

export const corsConfig: CorsOptions = {
    origin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
    exposedHeaders: ["set-cookie"]
} 