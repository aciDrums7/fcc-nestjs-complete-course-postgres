import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Song } from '@prisma/client';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';
import { SongsService } from './songs.service';

// ? With Scope.REQUEST, a new instance is instantiated for each request processing pipeline
@Controller({ path: 'songs' })
@ApiTags('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async createSong(@Body() createSongDTO: CreateSongDto): Promise<Song> {
    return await this.songsService.createSong(createSongDTO);
  }

  @Get()
  async findAllSongs(): Promise<Song[]> {
    return await this.songsService.findAllSongs();
  }

  @Get(':id')
  findSongById(
    @Param('id', ParseIntPipe)
    id: number
  ) {
    return this.songsService.findSong({ id });
  }

  @Put(':id')
  updateSongById(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateSongDTO: UpdateSongDto
  ) {
    return this.songsService.update({ id }, updateSongDTO);
  }

  @Delete(':id')
  deleteSongById(
    @Param('id', ParseIntPipe)
    id: number
  ) {
    return this.songsService.delete({ id });
  }
}
