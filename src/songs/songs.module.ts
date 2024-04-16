import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

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
  controllers: [SongsController],
  providers: [
    // ? custom providers
    SongsService, //* option 1
    // { provide: SongsService, useClass: SongsService }, //* option 2
    // { provide: SongsService, useValue: mockSongsService }, //* option 3
    { provide: 'CONNECTION', useValue: connection }, //* option 4
  ],
})
export class SongsModule {}
