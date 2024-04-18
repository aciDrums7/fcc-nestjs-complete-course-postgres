import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { CreatePlaylistDTO } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlaylistDTO): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;
    const songs = await this.songRepository.findBy({
      id: In(playlistDTO.songsIds),
    });
    playlist.songs = songs;
    const user = await this.userRepository.findOneBy({
      id: playlistDTO.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    playlist.user = user;

    return this.playlistRepository.save(playlist);
  }
}
