import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  firstName: string;

  @Column({ type: 'text', nullable: false })
  lastName: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  //   @OneToOne(() => Artist)
  //   @JoinColumn()
  //   artist: Artist;
}
