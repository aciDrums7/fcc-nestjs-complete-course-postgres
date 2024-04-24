import { Artist } from 'src/resources/artists/artist.entity';
import { Playlist } from 'src/resources/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'date', nullable: false })
  releaseDate: Date;

  @Column({ type: 'time', nullable: false })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;

  // @OneToMany(() => Artist, (artist) => artist.songs)
  // artists: Artist[];

  @ManyToOne(() => Playlist, (playlist) => playlist.songs)
  playlist: Playlist;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
}
