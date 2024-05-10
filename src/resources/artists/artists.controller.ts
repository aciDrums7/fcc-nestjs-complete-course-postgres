import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('artists')
@ApiTags('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Get()
  findAllArtists() {
    return this.artistsService.findAllArtists();
  }

  @Get(':id')
  findArtistById(@Param('id', ParseIntPipe) id: number) {
    return this.artistsService.findArtist({ id });
  }

  @Patch(':id')
  updateArtistById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArtistDto: UpdateArtistDto
  ) {
    return this.artistsService.updateArtist({ id }, updateArtistDto);
  }

  @Delete(':id')
  deleteArtistById(@Param('id', ParseIntPipe) id: number) {
    return this.artistsService.deleteArtist({ id });
  }
}
