import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];

  create(song) {
    this.songs.push(song);
    return this.songs.find((savedSong) => savedSong === song);
  }

  findAll() {
    return this.songs;
  }
}
