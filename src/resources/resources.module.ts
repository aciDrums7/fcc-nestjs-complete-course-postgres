import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SongsModule, ArtistsModule, UsersModule],
})
export class ResourcesModule {}
