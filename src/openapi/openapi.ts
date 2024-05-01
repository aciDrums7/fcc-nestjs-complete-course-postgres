import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import 'reflect-metadata';
import { parseArgs } from 'util';
import { AppModule } from '../app.module';
import { generateOpenapiOptions } from './openapi-options';

// ! "generate-client": "ts-node -r tsconfig-paths/register src/generate-client.ts",
async function generateOpenapi() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  // Use ConfigService to access environment variables
  const configService = app.get(ConfigService);
  const API_VERSION = configService.get<string>('apiVersion');

  app.setGlobalPrefix(`api/${API_VERSION}`, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const argv = parseArgs({
    options: {
      manifest: { type: 'boolean', short: 'm', default: false },
      client: { type: 'boolean', short: 'c', default: false },
    },
  });

  const includeManifest = argv.values.manifest!;
  const includeClient = argv.values.client!;

  const { documentBuilder, openApiOptions, swaggerOptions } =
    generateOpenapiOptions(API_VERSION, includeManifest, includeClient, false);

  await OpenApiNestFactory.configure(
    app,
    documentBuilder,
    openApiOptions,
    swaggerOptions,
  );

  Logger.log(`Openapi Script Ran Successfully`);
}

generateOpenapi();
