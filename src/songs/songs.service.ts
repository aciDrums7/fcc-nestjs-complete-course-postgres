import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
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
