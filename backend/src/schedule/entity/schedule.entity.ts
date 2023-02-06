import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cinema } from '../../cinema/entity/cinema.entity';
import { Session } from '../../session/entity/session.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Cinema, (cinema) => cinema.schedule)
  cinema: Cinema;

  @OneToMany(() => Session, (session) => session.id, { onDelete: 'CASCADE' })
  sessions: Session[];
}
