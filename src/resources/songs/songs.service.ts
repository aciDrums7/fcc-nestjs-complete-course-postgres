import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/resources/artists/artist.entity';

// ? With Scope.TRANSIENT, A new private instance of the provider is instantiated for every use
@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>
    /* @Inject('CONNECTION') private connection: Connection */
  ) {
    // Logger.log('Inside SongsService');
    // Logger.log(this.connection);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Song>> {
    // ! NestJS embedded error handling example
    // throw new Error('Error in db while fetching records');
    const queryBuilder = this.songsRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.title', 'ASC');
    return await paginate<Song>(queryBuilder, options);
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const { artistsIds, ...song } = songDTO;
    const artists = await this.artistsRepository.findBy({ id: In(artistsIds) });

    return this.songsRepository.save({ ...song, artists });
  }

  async update(id: number, songDTO: UpdateSongDTO): Promise<UpdateResult> {
    const { artistsIds, ...song } = songDTO;
    const artists = await this.artistsRepository.findBy({ id: In(artistsIds) });

    return this.songsRepository.update({ id }, { ...song, artists });
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }
}
