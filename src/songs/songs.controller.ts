import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import CreateSongDTO from './dto/create-song-dto';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'fetch song based on the id';
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Put(':id')
  update() {
    return 'update song based on the id';
  }

  @Delete(':id')
  delete() {
    return 'delete song based on the id';
  }
}
