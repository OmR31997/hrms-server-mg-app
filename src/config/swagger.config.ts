import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication) => {
    const IS_PROD = process.env.NODE_ENV === "production";

    const serverUrl = IS_PROD   
    ? "https://hrms-server-mg-app.onrender.com" : "http://localhost:3000";

    const config = new DocumentBuilder()
        .setTitle("HRMS-Server API")
        .setDescription("Automatically generated Swagger documentation")
        .setVersion("1.0.0")
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
            "bearerAuth"
        )
        .addServer(`${serverUrl}`, IS_PROD ? "Production Server": "Local Server")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger-ui', app, document, {
        swaggerOptions: {
            persistAuthorization: true
        }
    })
} 