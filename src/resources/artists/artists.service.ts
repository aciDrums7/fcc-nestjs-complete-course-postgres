import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dtos/create-artist.dto';
import { UpdateArtistDto } from './dtos/update-artist.dto';
import { Artist, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { JsonUtils } from 'src/common/utils/json.utils';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async findAllArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findArtist(where: Prisma.ArtistWhereUniqueInput): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where });
    if (!artist) {
      throw new NotFoundException(
        `Artist with ${JsonUtils.prismaWhereToJson(where)} not found`
      );
    }
    return artist;
  }

  async updateArtist(
    where: Prisma.ArtistWhereUniqueInput,
    updateArtistDto: UpdateArtistDto
  ) {
    await this.findArtist(where);
    return await this.prisma.artist.update({
      where,
      data: updateArtistDto,
    });
  }

  async deleteArtist(where: Prisma.ArtistWhereUniqueInput) {
    await this.findArtist(where);
    return await this.prisma.artist.delete({ where });
  }
}
