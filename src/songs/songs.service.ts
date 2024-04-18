import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song.dto';

// ? With Scope.TRANSIENT, A new private instance of the provider is instantiated for every use
@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    /* @Inject('CONNECTION') private connection: Connection */
  ) {
    // console.log('Inside SongsService');
    // console.log(this.connection);
  }

  findAll(): Promise<Song[]> {
    // ! NestJS embedded error handling example
    // throw new Error('Error in db while fetching records');
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  create(song: CreateSongDTO): Promise<Song> {
    return this.songsRepository.save({ ...song });
  }

  update(id: number, song: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update({ id }, { ...song });
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }
}
