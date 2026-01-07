import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import basicAuth from "express-basic-auth";
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { corsConfig } from '@config/cors.config';
import { setupSwagger } from '@config/swagger.config';
import cookieParser from 'cookie-parser';
import { ENV } from '@config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = app.getHttpAdapter().getInstance();
  server.set("trust proxy", true);

  app.enableCors(corsConfig);
  app.setGlobalPrefix('api');

  // 🔐 Swagger credentials (safe defaults)
  const SWAGGER_USER: any = process.env.SWAGGER_USER;
  const SWAGGER_PASS: any = process.env.SWAGGER_PASS;

  if (SWAGGER_USER && SWAGGER_PASS) {
    // 🔐 Middleware MUST be before listen
    app.use(
      '/swagger-ui',
      basicAuth({
        users: {
          [SWAGGER_USER]: SWAGGER_PASS,
        },
        challenge: true,
      }),
    );
  } else {
    console.warn('⚠️ Swagger credentials missing, Swagger UI not protected');
  }

  // Register Swagger UI
  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    skipMissingProperties: false
  }))

  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT!, "0.0.0.0");

  if (ENV.IS_PROD) {
    console.log(`Server running on port- ${process.env.PROD_URL}/api`);
    console.log(`Swagger - ${process.env.PROD_URL}/swagger-ui`);
  } else {
    console.log(`Server running on port- ${process.env.LOCAL_URL}/api`);
    console.log(`Swagger - ${process.env.LOCAL_URL}/swagger-ui`);
  }
}

bootstrap();
