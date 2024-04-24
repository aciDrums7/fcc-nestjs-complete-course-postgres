import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { OpenApiOptions } from 'nest-openapi-tools';

//* https://medium.com/@christianinyekaka/step-by-step-guide-adding-openapi-documentation-to-your-nestjs-api-c210754ad905
//* https://www.npmjs.com/package/nest-openapi-tools
export function generateClientOptions(API_VERSION: string) {
  // ? The DocumentBuilder helps to structure a base document that conforms to the OpenAPI Specification
  const documentBuilder: DocumentBuilder = new DocumentBuilder()
    .setTitle('Spotify Clone API')
    .setDescription('freeCodeCamp - NestJS Complete Course API')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .addBearerAuth();

  const openApiOptions: OpenApiOptions = {
    webServerOptions: {
      enabled: false,
      path: `api-docs/${API_VERSION}`,
    },
    fileGeneratorOptions: {
      enabled: true,
      outputFilePath: 'openapi/openapi.yaml', // or ./openapi.json
    },
    clientGeneratorOptions: {
      enabled: true,
      type: 'typescript-axios',
      outputFolderPath: 'openapi/typescript-api-client/src',
      additionalProperties: [
        'snapshot=true',
        'apiPackage=apis',
        'modelPackage=models',
        'withoutPrefixEnums=true',
        'withSeparateModelsAndApi=true',
        'stringEnums=true',
        'enablePostProcessFile=true',
      ].join(','),
      openApiFilePath: 'openapi/openapi.yaml', // or ./openapi.json
      skipValidation: false, // optional, false by default
    },
  };

  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  };

  // ? https://www.youtube.com/watch?v=11OjFCJoFjo
  return { documentBuilder, openApiOptions, swaggerOptions };
}
