import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/dev-config/dev-config.service';
import { validate } from './common/validators/env.validator';
import { envConfig } from './config/env.config';
import { ResourcesModule } from './resources/resources.module';
import { SeedModule } from './seed/seed.module';

@Module({
  //? import and export other modules, following encapsulation
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [envConfig],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    SeedModule,
    ResourcesModule,
  ], // repositories, services and factories
  controllers: [AppController], // REST controllers
  providers: [
    AppService,
    { provide: DevConfigService, useClass: DevConfigService },
    {
      provide: 'CONFIG',
      useFactory: () => process.env.PORT,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(/* private readonly datasource: DataSource */) {
    // Logger.log('dbName:', datasource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // * option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // * option 2
    // consumer.apply(LoggerMiddleware).forRoutes(SongsController); // * option 3
  }
}
