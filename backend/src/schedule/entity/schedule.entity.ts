import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../../movie/entity/movie.entity';
import { Cinema } from '../../cinema/entity/cinema.entity';
import { Session } from '../../session/entity/session.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Cinema, (cinema) => cinema.schedule, { onDelete: 'CASCADE' })
  @JoinColumn()
  cinema: Cinema;

  @ManyToOne(() => Movie, (movie) => movie.schedule, { onDelete: 'CASCADE' })
  @JoinColumn()
  movie: Movie;

  @OneToMany(() => Session, (session) => session.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  sessions: Session[];
}
