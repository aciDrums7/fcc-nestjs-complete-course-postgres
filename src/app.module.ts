import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { SongsModule } from './songs/songs.module';

@Module({
  //? import and export other modules, following encapsulation
  // imports: [],
  // exports: []
  controllers: [AppController], // REST controllers
  providers: [AppService],
  imports: [SongsModule], // repositories, services and factories
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // * option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // * option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // * option 2
  }
}
