import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Song } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';
import { JsonUtils } from 'src/common/utils/json.utils';

@Injectable()
export class SongsService {
  constructor(private readonly prisma: PrismaService) {}

  createSong(createSongDTO: CreateSongDto): Promise<Song> {
    createSongDTO.duration = new Date(
      `1969-03-07T${createSongDTO.duration}:00Z`
    ).toISOString();
    const song = this.prisma.song.create({
      data: createSongDTO,
    });
    return song;
  }

  findAllSongs(): Promise<Song[]> {
    return this.prisma.song.findMany();
  }

  async findSong(where: Prisma.SongWhereUniqueInput): Promise<Song> {
    const song = await this.prisma.song.findUnique({
      where,
    });
    if (!song) {
      // if (where.id) {
      //   throw new NotFoundException(`Song with id ${where.id} not found`);
      // } else {
      throw new NotFoundException(
        `Song with ${JsonUtils.prismaWhereToJson(where)} not found`
      );
    }
    return song;
  }

  async update(
    where: Prisma.SongWhereUniqueInput,
    updateSongDTO: UpdateSongDto
  ): Promise<Song> {
    await this.findSong(where);
    const song = await this.prisma.song.update({
      where,
      data: updateSongDTO,
    });
    return song;
  }

  async delete(where: Prisma.SongWhereUniqueInput) {
    await this.findSong(where);
    return this.prisma.song.delete({ where });
  }
}
