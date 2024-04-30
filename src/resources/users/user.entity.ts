import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/resources/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  firstName: string;

  @Column({ type: 'text', nullable: false })
  lastName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  @Exclude()
  // ? https://notiz.dev/blog/openapi-in-nestjs
  @ApiHideProperty()
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @Column({ type: 'text', nullable: true })
  @Exclude()
  @ApiHideProperty()
  secret2FA: string;

  @Column({ type: 'boolean', default: false })
  @Exclude()
  @ApiHideProperty()
  enable2FA: boolean;
}
