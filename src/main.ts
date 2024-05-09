import {
  INestApplication,
  Logger,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import fs from 'fs';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import { parseArgs } from 'util';
import yaml from 'yaml';
import { AppModule } from './app.module';
import { generateOpenapiOptions } from './config/openapi.config';
import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, apiVersion, openapiPath, env } = loadConfig(configService);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(`api/${apiVersion}`, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  if (env === 'dev') {
    await setupDevEnv(app, apiVersion, openapiPath);
  }

  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

function loadConfig(configService: ConfigService) {
  return {
    port: configService.get<number>('port'),
    apiVersion: configService.get<string>('apiVersion'),
    openapiPath: configService.get<string>('openapiPath'),
    env: configService.get<string>('env'),
  };
}

async function setupDevEnv(
  app: INestApplication<any>,
  apiVersion: string,
  openapiPath: string
) {
  const argv = parseArgs({
    options: {
      manifest: { type: 'boolean', short: 'm', default: false },
      client: { type: 'boolean', short: 'c', default: false },
      exit: { type: 'boolean', short: 'e', default: false },
    },
  });

  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const {
    manifest: generateManifest,
    client: generateClientApi,
    exit: closeApp,
  } = argv.values;
  const { documentBuilder, openApiOptions, swaggerOptions } =
    generateOpenapiOptions(apiVersion, false, generateClientApi, false);

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(
    app,
    documentBuilder.build(),
    swaggerOptions
  );

  if (generateManifest) {
    if (!fs.existsSync(openapiPath)) {
      fs.mkdirSync(openapiPath, { recursive: true });
    }
    fs.writeFileSync(`${openapiPath}/openapi.yaml`, yaml.stringify(document));
  }

  if (generateClientApi) {
    await OpenApiNestFactory.configure(
      app,
      documentBuilder,
      openApiOptions,
      swaggerOptions
    );
  }

  if (closeApp) {
    console.log('Exit flag detected. Shutting down the application...');
    await app.close();
    process.exit(0);
  } else {
    SwaggerModule.setup(`api-docs/${apiVersion}`, app, document);
  }
}

bootstrap();
