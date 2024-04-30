import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/dev-config.service/dev-config.service';
import { ArtistsModule } from './resources/artists/artists.module';
import { PlaylistsModule } from './resources/playlists/playlists.module';
import { SongsModule } from './resources/songs/songs.module';
import { UsersModule } from './resources/users/users.module';
import { SeedModule } from './seed/seed.module';

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
    TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    PlaylistsModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
  ], // repositories, services and factories
})
export class AppModule implements NestModule {
  constructor(private readonly datasource: DataSource) {
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
