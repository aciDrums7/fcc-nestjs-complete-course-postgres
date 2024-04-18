import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';
import { DevConfigService } from './common/providers/dev-config.service/dev-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
// import { DevtoolsModule } from '@nestjs/devtools-integration';

const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
  //? import and export other modules, following encapsulation
  // imports: [],
  // exports: []
  controllers: [AppController], // REST controllers
  providers: [
    AppService,
    { provide: DevConfigService, useClass: DevConfigService },
    {
      provide: 'CONFIG',
      useFactory: () =>
        process.env.NODE_ENV === 'production' ? prodConfig : devConfig,
    },
  ],
  imports: [
    // DevtoolsModule.register({ http: process.env.NODE_ENV !== 'production' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'spotify-clone',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SongsModule,
  ], // repositories, services and factories
})
export class AppModule implements NestModule {
  constructor(private readonly datasource: DataSource) {
    // console.log('dbName:', datasource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // * option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // * option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // * option 3
  }
}
