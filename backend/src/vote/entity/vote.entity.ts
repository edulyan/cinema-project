import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Movie } from '../../movie/entity/movie.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.votes)
  movie: Movie;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;
}
