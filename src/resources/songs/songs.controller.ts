import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { Song } from './song.entity';
import { SongsService } from './songs.service';
import { ArtistsJwtGuard } from 'src/auth/guards/artists-jwt/artists-jwt.guard';

// ? With Scope.REQUEST, a new instance is instantiated for each request processing pipeline
@Controller({ path: 'songs' /* , scope: Scope.DEFAULT */ })
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Song>> {
    try {
      limit = limit > 100 ? 100 : limit;
      return this.songsService.findAll({ page, limit });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
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
  @UseGuards(ArtistsJwtGuard)
  @ApiBearerAuth()
  async create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return await this.songsService.create(createSongDTO);
  }

  @Put(':id')
  @UseGuards(ArtistsJwtGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  @UseGuards(ArtistsJwtGuard)
  @ApiBearerAuth()
  async delete(
    @Param('id', ParseIntPipe)
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
