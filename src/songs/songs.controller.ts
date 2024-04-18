import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song.dto';

// ? With Scope.REQUEST, a new instance is instantiated for each request processing pipeline
@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async findAll(): Promise<Song[]> {
    try {
      return await this.songsService.findAll();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      const song = await this.songsService.findOne(id);
      if (!song) {
        throw new NotFoundException(`Song with id ${id} not found`);
      }
      return song;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new HttpException(
          `Song with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Post()
  async create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return await this.songsService.create(createSongDTO);
  }

  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    try {
      return await this.songsService.deleteById(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }
}
