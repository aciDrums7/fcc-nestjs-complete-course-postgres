import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ArtistsModule, PlaylistsModule, SongsModule, UsersModule],
})
export class ResourcesModule {}
