import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [SongsModule, ArtistsModule],
})
export class ResourcesModule {}
