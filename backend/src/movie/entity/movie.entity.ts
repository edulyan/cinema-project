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

  @Column({
    type: 'enum',
    enum: AgeRating,
  })
  ageRating: AgeRating;

  @Column()
  duration: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  trailer: string;

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

  @OneToMany(() => Schedule, (schedule) => schedule.movie, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  schedule: Schedule[];

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}
