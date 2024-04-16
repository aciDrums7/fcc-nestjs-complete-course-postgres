import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import CreateSongDTO from './dto/create-song-dto';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
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
