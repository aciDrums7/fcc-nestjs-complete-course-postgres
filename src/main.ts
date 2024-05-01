import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import { AppModule } from './app.module';
import { generateOpenapiOptions } from './openapi/openapi-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule /* , { snapshot: true } */);

  // Use ConfigService to access environment variables
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('port');
  const API_VERSION = configService.get<string>('apiVersion');

  app.useGlobalPipes(new ValidationPipe());
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  app.setGlobalPrefix(`api/${API_VERSION}`, {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const { documentBuilder, openApiOptions, swaggerOptions } =
    generateOpenapiOptions(API_VERSION, true, false, true);

  // ? In order to create a full document (with all HTTP routes defined)
  // ? we use the createDocument() method of the SwaggerModule class
  // const document = SwaggerModule.createDocument(
  //   app,
  //   documentBuilder.build(),
  //   swaggerOptions,
  // );
  // SwaggerModule.setup(`${API_VERSION}/api-docs`, app, document);

  await OpenApiNestFactory.configure(
    app,
    documentBuilder,
    openApiOptions,
    swaggerOptions,
  );

  await app.listen(PORT);
  Logger.log(`Application is running on: http://localhost:${PORT}`);
}
// ? this is called by nest start
bootstrap();
