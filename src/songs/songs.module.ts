import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

// const mockSongsService = {
//   findAll() {
//     return [
//       {
//         id: 1,
//         title: 'Lasting lover',
//       },
//     ];
//   },
// };
@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongsController],
  providers: [
    // ? custom providers
    SongsService, //* option 1
    // { provide: SongsService, useClass: SongsService }, //* useClass
    // { provide: SongsService, useValue: mockSongsService }, //* useValue
    // { provide: 'CONNECTION', useValue: connection }, //* useValue 2
  ],
})
export class SongsModule {}
