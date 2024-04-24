import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import { generateClientOptions } from './generate-client-options';
import { ConfigService } from '@nestjs/config';

// ! "generate-client": "ts-node -r tsconfig-paths/register src/generate-client.ts",
async function generateClient() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  // Use ConfigService to access environment variables
  const configService = app.get(ConfigService);
  const API_VERSION = configService.get<string>('API_VERSION', 'v1');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(`api/${API_VERSION}`, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const { documentBuilder, openApiOptions, swaggerOptions } =
    generateClientOptions(API_VERSION);

  await OpenApiNestFactory.configure(
    app,
    documentBuilder,
    openApiOptions,
    swaggerOptions,
  );

  Logger.log(`Created OpenAPI Client config`);
}

generateClient();
