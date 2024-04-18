import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  //   @OneToMany(() => Song, (song) => song.artists)
  //   songs: Song[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
