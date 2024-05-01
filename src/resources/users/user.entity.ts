import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/resources/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'Provide the first name of the user',
  })
  @Column({ type: 'text', nullable: false })
  firstName: string;

  @ApiProperty({
    example: 'Belusci',
    description: 'Provide the last name of the user',
  })
  @Column({ type: 'text', nullable: false })
  lastName: string;

  @ApiProperty({
    example: 'john@belusci.com',
    description: 'Provide the email of the user',
  })
  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @ApiProperty({
    example: '+1 123-456-7890',
    description: 'Provide the phone number of the user',
  })
  @Column({ type: 'text', nullable: true })
  phone?: string;

  @ApiProperty({
    example: 'Password1!',
    description: 'Provide the password of the user',
  })
  @Column({ type: 'text', nullable: false })
  @Exclude()
  // ? https://notiz.dev/blog/openapi-in-nestjs
  password: string;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  secret2FA: string;

  @Column({ type: 'boolean', default: false })
  @Exclude()
  enable2FA: boolean;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  apiKey: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
