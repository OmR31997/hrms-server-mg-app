import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import basicAuth from "express-basic-auth";
import { setupSwagger } from './config/swagger.config';
import { AllExceptionsFilter } from './utils/helper';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 3000);

  console.log(`Server running on port- ${process.env.BASE_URL}/api`);
  console.log(`Swagger - ${process.env.BASE_URL}/swagger-ui`);
}

bootstrap();
