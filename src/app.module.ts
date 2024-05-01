import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'db/data-source';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { DevConfigService } from './common/providers/dev-config.service/dev-config.service';
import configuration from './config/configuration';
import { ArtistsModule } from './resources/artists/artists.module';
import { PlaylistsModule } from './resources/playlists/playlists.module';
import { SongsModule } from './resources/songs/songs.module';
import { UsersModule } from './resources/users/users.module';
import { SeedModule } from './seed/seed.module';

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
      useFactory: () => process.env.PORT,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev', '.env.prod'],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
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
