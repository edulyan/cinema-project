import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from '../../schedule/entity/schedule.entity';
import { AgeRating, Country, Genre } from '../../common/enums';
import { Ticket } from '../../ticket/entity/ticket.entity';
import { Vote } from '../../vote/entity/vote.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'simple-array' })
  director: string[];

  @Column()
  year: number;

  @Column({ unique: true })
  slug: string;

  @Column({
    type: 'enum',
    enum: AgeRating,
  })
  ageRating: AgeRating;

  @Column()
  duration: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  imgVert: string;

  @Column({ nullable: true })
  trailer: string;

  @Column({ nullable: true })
  isFeature: boolean;

  @Column({
    type: 'enum',
    enum: Country,
    array: true,
  })
  countries: Country[];

  @Column({
    type: 'enum',
    enum: Genre,
    array: true,
  })
  genre: Genre[];

  @Column({ type: 'simple-array' })
  actors: string[];

  @OneToMany(() => Vote, (vote) => vote.movie)
  votes: Vote[];

  @OneToMany(() => Schedule, (schedule) => schedule.movie, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  schedule: Schedule[];

  @OneToMany(() => Ticket, (ticket) => ticket.movie, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  tickets: Ticket[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
