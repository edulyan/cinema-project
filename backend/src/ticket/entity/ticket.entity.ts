import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Session } from '../../session/entity/session.entity';
import { Movie } from '../../movie/entity/movie.entity';
import { IRoomSeat } from '../../common/interfaces';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json', { array: false })
  seats: IRoomSeat[];

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  buyer: User;

  @ManyToOne(() => Movie, (movie) => movie.tickets, {
    onDelete: 'CASCADE',
  })
  movie: Movie;

  @ManyToOne(() => Session, (session) => session.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  session: Session;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
