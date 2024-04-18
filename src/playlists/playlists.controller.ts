import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  async create(@Body() createPlaylistDTO: CreatePlaylistDTO) {
    try {
      return this.playlistsService.create(createPlaylistDTO);
    } catch (e) {
      if (e instanceof NotFoundException) {
        return new HttpException(e.message, HttpStatus.NOT_FOUND, {
          cause: e.cause,
        });
      }
    }
  }
}
