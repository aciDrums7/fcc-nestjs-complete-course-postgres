import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { OpenApiOptions } from 'nest-openapi-tools';

//* https://medium.com/@christianinyekaka/step-by-step-guide-adding-openapi-documentation-to-your-nestjs-api-c210754ad905
//* https://www.npmjs.com/package/nest-openapi-tools
export function getOpenAPIConfigs(
  apiVersion: string,
  port: number,
  openapiPath: string,
  includeManifest: boolean,
  includeClient: boolean,
  startWebServer: boolean
) {
  // ? The DocumentBuilder helps to structure a base document that conforms to the OpenAPI Specification
  const documentBuilder: DocumentBuilder = new DocumentBuilder()
    .setTitle('Spotify Clone API - Postgres - PrismaORM')
    .setDescription('freeCodeCamp - NestJS Complete Course API')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`);

  const openApiOptions: OpenApiOptions = {
    webServerOptions: {
      enabled: startWebServer,
      path: `api-docs/${apiVersion}`,
    },
    fileGeneratorOptions: {
      enabled: includeManifest,
      outputFilePath: `${openapiPath}/openapi.yaml`, // or ./openapi.json
    },
    clientGeneratorOptions: {
      enabled: includeClient,
      type: 'typescript-axios',
      outputFolderPath: `${openapiPath}/typescript-axios-api-client/src`,
      additionalProperties: [
        'snapshot=true',
        'apiPackage=apis',
        'modelPackage=models',
        'withoutPrefixEnums=true',
        'withSeparateModelsAndApi=true',
        'stringEnums=true',
        'enablePostProcessFile=true',
      ].join(','),
      openApiFilePath: `${openapiPath}/openapi.yaml`, // or ./openapi.json
      // skipValidation: false, // optional, false by default
    },
  };

  const swaggerOptions: SwaggerDocumentOptions = {
    // deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${methodKey}`,
  };

  // ? https://www.youtube.com/watch?v=11OjFCJoFjo
  return { documentBuilder, openApiOptions, swaggerOptions };
}
