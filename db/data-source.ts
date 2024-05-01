import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Artist } from 'src/resources/artists/artist.entity';
import { Playlist } from 'src/resources/playlists/playlist.entity';
import { Song } from 'src/resources/songs/song.entity';
import { User } from 'src/resources/users/user.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'fcc-nestjs-spotify-clone-migration',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'], // 3
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('db.host'),
      port: configService.get<number>('db.port'),
      database: configService.get<string>('db.name'),
      username: configService.get<string>('db.username'),
      password: configService.get<string>('db.password'),
      entities: [User, Artist, Song, Playlist],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};
