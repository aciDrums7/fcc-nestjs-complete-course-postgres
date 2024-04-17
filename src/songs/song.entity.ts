import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false, array: true })
  artists: string[];

  @Column({ type: 'date', nullable: false })
  releaseDate: Date;

  @Column({ type: 'time', nullable: false })
  duration: Date;

  @Column({ type: 'text', nullable: true })
  lyrics: string;
}
