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
    // { provide: SongsService, useClass: SongsService }, //* useClass
    // { provide: SongsService, useValue: mockSongsService }, //* useValue
    { provide: 'CONNECTION', useValue: connection }, //* useValue 2
  ],
})
export class SongsModule {}
