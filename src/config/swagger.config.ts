import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ENV } from "./env.config";

export const setupSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle("HRMS-Server API")
        .setDescription("Automatically generated Swagger documentation")
        .setVersion("1.0.0")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                in: "header"
            },
            "access-token"
        )
        .build();

    const document = SwaggerModule.createDocument(app, config, { deepScanRoutes: true });

    document.servers = ENV.IS_PROD
        ? [{ url: `${process.env.PROD_URL}/api`, description: "PROD" }]
        : [
            { url: `${process.env.LOCAL_URL}/api`, description: "LOCAL" },
            { url: `${process.env.DEV_URL}/api`, description: "DEV" },
        ];

    SwaggerModule.setup('swagger-ui', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tryItOutEnabled: true,
            defaultModelExpandDepth: -1
        }
    }) as any
} 