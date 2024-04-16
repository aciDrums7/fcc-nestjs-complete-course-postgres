import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'src/common/constants/connection';

@Injectable()
export class SongsService {
  constructor(@Inject('CONNECTION') private connection: Connection) {
    console.log('Inside SongsService');
    console.log(this.connection);
  }

  private readonly songs = [];

  create(song) {
    this.songs.push(song);
    return this.songs.find((savedSong) => savedSong === song);
  }

  findAll() {
    // ! NestJS embedded error handling example
    throw new Error('Error in db while fetching records');
    return this.songs;
  }
}
