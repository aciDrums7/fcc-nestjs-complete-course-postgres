import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import { getOpenAPIConfigs } from 'src/config/openapi.config';
import metadata from 'src/metadata';
import { parseArgs } from 'util';

export async function generateOpenAPI(
  app: INestApplication<any>,
  apiVersion: string,
  port: number,
  openapiPath: string
) {
  const argv = parseArgs({
    options: {
      manifest: { type: 'boolean', short: 'm', default: false },
      client: { type: 'boolean', short: 'c', default: false },
      exit: { type: 'boolean', short: 'e', default: false },
    },
  });

  const {
    manifest: generateManifest,
    client: generateClientApi,
    exit: closeApp,
  } = argv.values;

  const { documentBuilder, openApiOptions, swaggerOptions } = getOpenAPIConfigs(
    apiVersion,
    port,
    openapiPath,
    generateManifest,
    generateClientApi,
    !closeApp
  );

  try {
    await SwaggerModule.loadPluginMetadata(metadata);
    await OpenApiNestFactory.configure(
      app,
      documentBuilder,
      openApiOptions,
      swaggerOptions
    );
    const openapiMessage =
      generateManifest && generateClientApi
        ? 'OpenAPI Manifest and Client API'
        : generateManifest
          ? 'OpenAPI Manifest'
          : generateClientApi
            ? 'OpenAPI Client API'
            : '';

    if (generateManifest || generateClientApi) {
      console.log(
        `\n${openapiMessage} generated correctly at path: ${openapiPath}`
      );
    }

    if (closeApp) {
      console.log('\nExit flag detected. Shutting down the application...');
      await app.close();
      process.exit(0);
    }
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}
